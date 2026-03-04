import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "./Components/Header/Header";
import SettingsPanel from "./Components/SettingsPanel/SettingsPanel";
import ChatBox from "./Components/ChatBox/ChatBox";
import InputArea from "./Components/InputArea/InputArea";
import { sendStreamingRequest } from "./aiService/aiService";
import { GoSidebarExpand } from "react-icons/go";

import "./theme.css";
import { PiSidebarLight } from "react-icons/pi";

export default function OpenRouterStreamingChat() {
  const [apiKey, setApiKey] = useState(
    "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"//
  );
  const [model, setModel] = useState("openai/gpt-4o-mini");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("Hazır.");
  const [error, setError] = useState("");
  const [dark, setDark] = useState(true);
  const [chats, setChats] = useState(() => {
  const saved = localStorage.getItem("chat_history");
  return saved ? JSON.parse(saved) : [];
});
  const [,  setActiveChatId] = useState(null);
  

  // ✅ Sidebar state (ChatGPT-like)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [pendingFiles, setPendingFiles] = useState([]);
  const [memoryFiles, setMemoryFiles] = useState([]);

  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem("or_react_chat_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const chatRef = useRef(null);
  const abortRef = useRef(null);

useEffect(() => {
  if (chats.length === 0) {
    const firstChat = {
      id: Date.now(),
      title: "New Chat",
      messages: []
    };

    setChats([firstChat]);
    setActiveChatId(firstChat.id);
  }
}, [chats.length]);


  useEffect(() => {
    try {
      localStorage.setItem("or_react_chat_v1", JSON.stringify(messages));
    } catch {}
  }, [messages]);

useEffect(() => {
  const el = chatRef.current;
  if (!el) return;

  el.scrollTo({
    top: el.scrollHeight,
    behavior: "smooth"
  });

  
}, [messages]);

  // Ensure body class is in sync with state (important for theme.css)
  useEffect(() => {
    const body = document.body;
    if (dark) body.classList.add("dark");
    else body.classList.remove("dark");
  }, [dark]);

  // Close sidebar on ESC (nice UX)
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);
 

  useEffect(() => {
  localStorage.setItem("chat_history", JSON.stringify(chats));
}, [chats]);

  const canSend = useMemo(() => {
    const hasText = input.trim().length > 0;
    const hasFiles = pendingFiles.length > 0;
    const hasKey = apiKey && apiKey.trim().length > 0;
    return hasKey && (hasText || hasFiles) && !isSending;
  }, [apiKey, input, pendingFiles, isSending]);

  function clearChat() {
    setMessages([]);
    setMemoryFiles([]);
    setError("");
    setStatus("Temizlendi.");
  }

function deleteChat(id) {
  setChats(prev => prev.filter(chat => chat.id !== id));
}
 function newChat() {

  if (messages.length > 0) {

    const chat = {
      id: Date.now(),
      title: messages[0].content.slice(0,40),
      messages: messages
    };

    setChats(prev => [chat, ...prev]);

  }

  setMessages([]);

}


  function stop() {
    if (abortRef.current) abortRef.current.abort();
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function onSend() {
    const text = input.trim();
    const hasFiles = pendingFiles.length > 0;

    if (!text && !hasFiles) return;

    setIsSending(true);
    setError("");
    setStatus("Yazıyor...");

    const userMsg = {
      role: "user",
      content: text || "Dosya gönderildi",
      files: pendingFiles.map((f) => ({
        name: f.name,
        type: f.type,
        url: URL.createObjectURL(f),
      })),
    };

    let assistantIndex = -1;

    setMessages((prev) => {
      const next = [...prev, userMsg, { role: "assistant", content: "" }];
      assistantIndex = next.length - 1;
      return next;
    });

    let fileBlocks = [];

    for (const f of memoryFiles) {
      const base64 = await fileToBase64(f);

      if (f.type.startsWith("image/")) {
        fileBlocks.push({
          type: "image_url",
          image_url: { url: base64 },
        });
      } else if (f.type === "application/pdf") {
        fileBlocks.push({
          type: "file",
          file: { url: base64 },
        });
      } else if (f.name.endsWith(".csv")) {
        const txt = await f.text();
        fileBlocks.push({
          type: "text",
          text: `CSV DATA:\n${txt}`,
        });
      }
    }

    if (pendingFiles.length > 0) {
      setMemoryFiles((prev) => [...prev, ...pendingFiles]);
    }

    setInput("");
    setPendingFiles([]);
    await Promise.resolve();

    const controller = new AbortController();
    abortRef.current = controller;

    let fullText = "";

    try {
      await sendStreamingRequest({
        apiKey,
        model,
        systemPrompt,
        messages,

        userText: fileBlocks.length
          ? [
              {
                type: "text",
                text: text?.length
                  ? text
                  : "Bu dosyayı analiz et ve hafızanda tut.",
              },
              ...fileBlocks,
            ]
          : text,

        signal: controller.signal,

        onToken: (token) => {
          fullText += token;

          setMessages((prev) => {
            const next = [...prev];
            const cur = next[assistantIndex];
            if (!cur) return prev;

            next[assistantIndex] = {
              ...cur,
              content: fullText,
            };
            return next;
          });
        },
      });
    } catch (e) {
      const msg = e?.message || "Hata";

      setMessages((prev) => {
        const next = [...prev];
        for (let i = next.length - 1; i >= 0; i--) {
          if (next[i].role === "assistant") {
            next[i] = { role: "assistant", content: "Hata: " + msg };
            break;
          }
        }
        return next;
      });

      setError(msg);
      setStatus("Hata");
    } finally {
      setIsSending(false);
      abortRef.current = null;
    }
  }

  function addFiles(files) {
    setPendingFiles((prev) => [...prev, ...files]);
  }

  function loadChat(chat) {
  setMessages(chat.messages);
}

function renameChat(id) {

  const name = prompt("\r Bitte neuen Namen eingeben");

  if (!name) return;

  setChats(prev =>
    prev.map(chat =>
      chat.id === id ? { ...chat, title: name } : chat
    )
  );
}


  function removeFile(index) {
    setPendingFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function toggleTheme() {
    setDark((prev) => !prev);
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) onSend();
    }
  }

  return (
    <div className="app appShell">
      {/* Topbar (menu button + theme toggle) */}
      <div className="topbar">
        <button
          type="button"
          className="menuBtn"
          aria-label="Ayarlar menüsünü aç/kapat"
          onClick={() => setSidebarOpen((v) => !v)}
        >
          <PiSidebarLight />
        </button>
          <Header 
          
          
           dark={dark} toggleTheme={toggleTheme}/>
        
      </div>

      {/* Scrim */}
      <div
        className={`scrim ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden={!sidebarOpen}
      />

      {/* Sidebar (ONLY SettingsPanel) */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebarHeader">


    <button
      className="closeSidebarBtn"
      onClick={() => setSidebarOpen(false)}
      aria-label="Sidebar kapat"
    >
     <GoSidebarExpand />

    </button>
  </div>
        <div style={{ padding: 16 }}>
          <SettingsPanel
            apiKey={apiKey}
            setApiKey={setApiKey}
            model={model}
            setModel={setModel}
            toggleTheme={toggleTheme}
            systemPrompt={systemPrompt}
            setSystemPrompt={setSystemPrompt}
            status={status}
            messages={messages}
            clearChat={clearChat}
            stop={stop}
            isSending={isSending}
            error={error}
            newChat={newChat}
            chats={chats}
             
            loadChat={loadChat}
            deleteChat={deleteChat}
            renameChat={renameChat}


          />
        </div>
      </aside>

      {/* Center column */}
      <div className="centerWrap">
        

        <div className="chat-container">
          <ChatBox messages={messages} chatRef={chatRef} />
        </div>

        <InputArea
          input={input}
          setInput={setInput}
          onSend={onSend}
          onKeyDown={onKeyDown}
          canSend={canSend}
          isSending={isSending}
          onFilesSelected={addFiles}
          selectedFiles={pendingFiles}
          onRemoveFile={removeFile}
        />
      </div>
    </div>
  );
}