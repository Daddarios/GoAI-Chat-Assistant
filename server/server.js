import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.join(__dirname, "../build");
const indexPath = path.join(buildPath, "index.html");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const API_KEY = process.env.OPENROUTER_API_KEY;
console.log("API_KEY loaded:", API_KEY ? `yes (len=${API_KEY.length}, prefix=${API_KEY.slice(0, 8)})` : "NO - MISSING!");

// Build varsa static yayınla
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
}

app.post("/chat", async (req, res) => {
  try {
    if (!API_KEY) {
      return res.status(500).json({ error: "OPENROUTER_API_KEY not configured on server" });
    }
    const { model, systemPrompt, messages = [], userText } = req.body;
    const payloadMessages = [];

    if (systemPrompt?.trim()) {
      payloadMessages.push({
        role: "system",
        content: systemPrompt.trim(),
      });
    }

    for (const m of messages) {
      if (m.role === "user" || m.role === "assistant") {
        payloadMessages.push({
          role: m.role,
          content: m.content,
        });
      }
    }

    if (userText) {
      payloadMessages.push({
        role: "user",
        content: typeof userText === "string" ? userText : JSON.stringify(userText),
      });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: payloadMessages,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      return res.status(response.status || 400).json({
        error: data?.error?.message || "OpenRouter API fehlerhaft",
      });
    }

    const assistantMessage = data.choices?.[0]?.message?.content || "No response";
    res.json({ choices: [{ message: { content: assistantMessage } }] });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Sadece build varsa SPA fallback (Express 5 uyumlu middleware)
if (fs.existsSync(indexPath)) {
  app.use((req, res, next) => {
    if (req.method !== "GET") return next();
    if (req.path.startsWith("/chat")) return next();
    res.sendFile(indexPath);
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});