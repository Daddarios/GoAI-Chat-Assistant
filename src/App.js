import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "./Components/Header/Header";
import SettingsPanel from "./Components/SettingsPanel/SettingsPanel";
import ChatBox from "./Components/ChatBox/ChatBox";
import InputArea from "./Components/InputArea/InputArea";
import{ sendenChatMessage} from "./aiService/aiService";
import { GoSidebarExpand } from "react-icons/go";
import "./theme.css";
import { PiSidebarLight } from "react-icons/pi";

export default function OpenRouterStreamingChat() {
 
  const [model, setModel] = useState("nvidia/nemotron-nano-9b-v2:free");
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
  const [activeChatId,setActiveChatId] = useState(null);
  

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

 // 1. Uygulama ilk açıldığında hiç chat yoksa bir tane "New Chat" oluşturur
useEffect(() => {
  if (chats.length === 0) {
    const firstChat = {
      id: Date.now(),
      title: "New Chat",
      messages: []
    };

    setChats([firstChat]);
   
  }
}, [chats.length]);

// 2. Mesajlar her değiştiğinde local tarayıcı hafızasına (localStorage) kaydeder
  useEffect(() => {
    try {
      localStorage.setItem("or_react_chat_v1", JSON.stringify(messages));
    }catch (err) {
    console.error("Local storage fehler:", err);
  } 

  }, [messages]);

// 3. Mesajlar değiştikçe sayfayı otomatik olarak en aşağı kaydırır (Smooth scroll)
useEffect(() => {
  const el = chatRef.current;
  if (!el) return;

  el.scrollTo({
    top: el.scrollHeight,
    behavior: "smooth"
  });

  
}, [messages]);

// 4. AKTİF CHAT GÜNCELLEME: Mesaj yazıldıkça soldaki chat listesindeki içeriği günceller
useEffect(() => {
  if (!activeChatId) return; // Eğer aktif bir chat seçili değilse işlem yapma
  setChats(prev =>
    prev.map(chat =>
      chat.id === activeChatId
        ? { ...chat, messages } // Aktif chat'in mesajlarını güncelle
        : chat
    )
  );
}, [messages, activeChatId]);

  // 5. Ensure body class is in sync with state (important for theme.css)
  useEffect(() => {
    const body = document.body;
    if (dark) body.classList.add("dark");
    else body.classList.remove("dark");
  }, [dark]);

  //6. Close Sidebar on ESC (nice UX)
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);
 
// 7. Chat listesi (chats) her değiştiğinde tarayıcı hafızasına kaydeder
  useEffect(() => {
  localStorage.setItem("chat_history", JSON.stringify(chats));
}, [chats]);

  const canSend = useMemo(() => {
    const hasText = input.trim().length > 0;
    const hasFiles = pendingFiles.length > 0;
    return (hasText || hasFiles) && !isSending;
  }, [input, pendingFiles, isSending]);

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
  setActiveChatId(null);

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

      const assistantIndex = messages.length + 1;

      setMessages((prev) => {
        return [...prev, userMsg, { role: "assistant", content: "" }];
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

    

    try {
    const assistantMessage = await sendenChatMessage({
        model,
        systemPrompt,
        messages,
        userText: fileBlocks.length
        ?[
          {type: "text", text: text?.length ? text :"Bu dosyayi analiz et ve hafizanda tut."},
          ...fileBlocks
        ]
        :text,
        signal : controller.signal,
    });
     setMessages((prev) => {
        const next = [...prev];
        next[assistantIndex] = {...next[assistantIndex], content: assistantMessage};
        return next;
  
    });
} catch (e) {
    const msg = e?.message || "Fehler";
    setMessages((prev) => {
        const next = [...prev];
        for (let i = next.length - 1; i >= 0; i--) {
            if (next[i].role === "assistant") {
                next[i] = { role: "assistant", content: "Fehler: " + msg };
                break;
            }
        }
        return next;
    });
    setError(msg);
    setStatus("Fehler");
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
  setActiveChatId(chat.id);
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
          stop={stop}
        />
      </div>
    </div>
  );
}