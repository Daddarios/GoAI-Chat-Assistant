import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ✅ React build dosyalarını sun
app.use(express.static(path.join(__dirname, "../build")));

const API_KEY = process.env.OPENROUTER_API_KEY;

app.post("/chat", async (req, res) => {
  try {
    const { model, systemPrompt, messages, userText } = req.body;
    const payloadMessages = [];

    if (systemPrompt?.trim()) {
      payloadMessages.push({ role: "system", content: systemPrompt.trim() });
    }

    for (const m of messages) {
      if (m.role === "user" || m.role === "assistant") {
        payloadMessages.push({ role: m.role, content: m.content });
      }
    }

    if (userText) {
      payloadMessages.push({
        role: "user",
        content: typeof userText === "string" ? userText : JSON.stringify(userText)
      });
    }

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
    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    const assistantMessage = data.choices?.[0]?.message?.content || "No response";
    res.json({ choices: [{ message: { content: assistantMessage } }] });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ SPA desteği
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// ✅ Dinamik Port Ayarı
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
