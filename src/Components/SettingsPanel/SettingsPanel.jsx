import "./SettingsPanel.css";
import { AiOutlineClear, AiOutlineClose } from "react-icons/ai";
import { BsStopCircle } from "react-icons/bs";
import { PiPencilSimpleLine } from "react-icons/pi";
import { HiOutlinePencilSquare } from "react-icons/hi2";




export default function SettingsPanel({
  apiKey,
  setApiKey,
  model,
  setModel,
  systemPrompt,
  setSystemPrompt,
  status,
  messages,
  clearChat,
  stop,
  toggleTheme,
  isSending,
  toggleSidebar,
  error,
  newChat,
  chats,
  loadChat,
  deleteChat,
  renameChat
  
}) {

  return (
    <div className="settingsPanel">
      <h2 className="hd-title"> Go - ÆI </h2>
        
   <div class="slider-wrapper">
        Alles für
        <div class="slider">
          <div class="slider-text-1">neue Ideen</div>
          <div class="slider-text-2">smarten Code</div>
          <div class="slider-text-3">kreative Lösungen</div>
          <div class="slider-text-4">AI Unterstützung</div>
          <div class="slider-text-5">digitale Zukunft</div>
        </div>
      </div>
     
   <hr className="hr-line"/>
   <br />
   
        {/* yeni Sohbet */}
        <div>
          <button className="btnnwchat" onClick={newChat}title="Start Chat">

          <HiOutlinePencilSquare />
          <span>Start Chat</span>
          </button>
          
        </div>
        <br />
        
      <div className="settings-grid">

 

    
        {/* MODEL */}
        <div className="field">
          <label>Model</label>
          <select className="slct" value={model} onChange={(e)=>setModel(e.target.value)}>
                <option value="openai/gpt-3.5">GPT-3.5</option>

                <option value="nvidia/nemotron-nano-9b-v2:free">
                  NVIDIA Nemotron FREE
                </option>

                  <option value="deepseek/deepseek-r1:free">
                    DeepSeek R1 FREE
                  </option>

                  <option value="zhipu/glm-4.5-air:free">
                    GLM-4.5 Air FREE
                  </option>
                
          </select>

          
        </div>
        
        {/* SYSTEM PROMPT */}
        <div className="field">
          <label>System Prompt</label>
          <input
            value={systemPrompt}
            onChange={(e)=>setSystemPrompt(e.target.value)}
            placeholder="Kısa ve net cevap ver"
          />
        </div>

      </div>

      {/* ALT BUTONLAR */}
      <div className="bottom">

        <span>Mesaj: {messages.length}</span>

        <button onClick={clearChat} disabled={isSending}>
          <AiOutlineClear />
        </button>

        <button onClick={stop} disabled={!isSending}>
          <BsStopCircle />
        </button>
        

           {/* THEME BUTTON */}
       
        {error && <span className="error">Hata: {error}</span>}
        

     

      </div>
      
      
      <br />

       <div>
        <h4>Chat History</h4>
         {chats.map(chat => (
        <div key={chat.id} className="chatItem">

          <span onClick={() => loadChat(chat)}>
            {chat.title}
          </span>

          <button className="btnclose" onClick={() => deleteChat(chat.id)} title="Delete Chat">
            <AiOutlineClose />
          </button>
          
          <button className="btnrename" onClick={() => renameChat(chat.id)} title="Rename Chat">
            <PiPencilSimpleLine />
          </button>

        </div>
))}
      </div>
     
    </div>
  );
} 
