const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const FREE_MODELS = [
  "nvidia/nemotron-nano-9b-v2:free",
  "qwen/qwen2.5-7b-instruct:free",
  "openai/gpt-3.5-turbo:free"
];

function sleep(ms){
  return new Promise(r=>setTimeout(r,ms));
}

export async function sendStreamingRequest({
  apiKey,
  model,
  systemPrompt,
  messages,
  userText,
  onToken,
  signal,
  maxRetries = 4
}){

  const key = apiKey.trim();
  const baseDelay = 1200;

  const payloadMessages = [];

  if(systemPrompt?.trim()){
    payloadMessages.push({
      role:"system",
      content:systemPrompt.trim()
    });
  }

  for(const m of messages){
    if(m.role==="user" || m.role==="assistant"){
      payloadMessages.push({
        role:m.role,
        content:m.content
      });
    }
  }

  payloadMessages.push({
    role:"user",
    content:userText
  });

  for(let attempt=0; attempt<=maxRetries; attempt++){

    try{

      console.log("🧠 GİDEN MODEL:", model);
      console.log("📦 PAYLOAD:", payloadMessages);

      const res = await fetch(OPENROUTER_URL,{
        method:"POST",
        signal,
        headers:{
          Authorization:`Bearer ${key}`,
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          model,
          messages:payloadMessages,
          stream:true,
          temperature:0.7
        })
      });
      

      if(!res.ok){

      

        let data={};
        try{ data = await res.json(); }catch{}

        const msg = data?.error?.message || `HTTP ${res.status}`;
        const code = data?.error?.code || res.status;

        const shouldRetry =
          code===429 ||
          (res.status>=500 && res.status<=599);

        if(shouldRetry && attempt<maxRetries){
          const delay = Math.round(baseDelay*Math.pow(2,attempt));
          await sleep(delay);
          continue;
        }

        throw new Error(msg);
        
      }

      if(!res.body){
        throw new Error("Streaming desteklenmiyor");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let buffer="";

      while(true){
        const {done,value} = await reader.read();
        if(done) break;

        buffer += decoder.decode(value,{stream:true});
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";

        for(const part of parts){
          const lines = part.split("\n");

          for(const line of lines){
            const trimmed = line.trim();
            if(!trimmed.startsWith("data:")) continue;

            const dataStr = trimmed.replace(/^data:\s*/,"");

            if(dataStr==="[DONE]"){
              return;
            }

            if(!dataStr) continue;

            let json;
            try{ json = JSON.parse(dataStr); }
            catch{ continue; }

            const token = json?.choices?.[0]?.delta?.content;

            if(typeof token==="string" && token.length){
              onToken(token); // 🔥 sadece token gönderir
            }

            const streamErr = json?.error?.message;
            if(streamErr) throw new Error(streamErr);
          }
        }
      }

      return;

    }catch(e){

      if(e?.name==="AbortError"){
        throw new Error("İstek durduruldu");
      }

      if(attempt<maxRetries){
        const delay = Math.round(baseDelay*Math.pow(2,attempt));
        await sleep(delay);
        continue;
      }

      throw e;
    }
  }

  throw new Error("Fehler !");
}

