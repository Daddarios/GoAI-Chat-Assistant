import express from "express";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb", extended: true}));


const API_KEY = process.env.OPENROUTER_API_KEY;

app.post("/chat", async (req, res) => {
  try {
    // ✅ Frontend'den gelen veriyi ayıkla
    const { model, systemPrompt, messages, userText } = req.body;

    // ✅ OpenRouter formatında mesaj array'i oluştur
    const payloadMessages = [];

    // System prompt varsa ekle
    if (systemPrompt?.trim()) {
      payloadMessages.push({ role: "system", content: systemPrompt.trim() });
    }

    // Önceki mesajları ekle
    for (const m of messages) {
      if (m.role === "user" || m.role === "assistant") {
        payloadMessages.push({ role: m.role, content: m.content });
      }
    }

    // Yeni user mesajını ekle
    if (userText) {
      payloadMessages.push({
        role: "user",
        content: typeof userText === "string" ? userText : JSON.stringify(userText)
      });
    }

    // ✅ OpenRouter'a doğru formatta gönder
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: payloadMessages
      })
    });

    const data = await response.json();

    console.log("OpenRouter API Response:", JSON.stringify(data, null, 2));

    // ✅ API hatası kontrolü
    if (data.error) {
      console.error("OpenRouter Error:", data.error);
      return res.status(400).json({ error: data.error.message });
    }

    const assistantMessage =
      data.choices?.[0]?.message?.content || "No response";

    res.json({ choices: [{ message: { content: assistantMessage } }] });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3001, () => {
  console.log("AI proxy server running on port 3001");
});