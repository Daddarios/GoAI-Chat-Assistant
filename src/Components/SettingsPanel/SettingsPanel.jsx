import "./SettingsPanel.css";
import { AiOutlineClear, AiOutlineClose } from "react-icons/ai";

import { PiPencilSimpleLine } from "react-icons/pi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FiChevronDown } from "react-icons/fi";
import { useState } from "react";

export default function SettingsPanel({
  model,
  setModel,
  systemPrompt,
  setSystemPrompt,
  status,
  messages,
  clearChat,
  toggleTheme,
  isSending,
  error,
  newChat,
  chats,
  loadChat,
  deleteChat,
  renameChat
}) {

const [openHistory, setOpenHistory] = useState(true);

return (
<div className="settingsPanel">

<h2 className="hd-title">Go - ÆI</h2>

<div className="slider-wrapper">
Alles für
<div className="slider">
<div className="slider-text-1">neue Ideen</div>
<div className="slider-text-2">smarten Code</div>
<div className="slider-text-3">kreative Lösungen</div>
<div className="slider-text-4">AI Unterstützung</div>
<div className="slider-text-5">digitale Zukunft</div>
</div>
</div>

<hr className="hr-line"/>
<br/>

{/* START CHAT */}

<button className="btnnwchat" onClick={newChat} title="Start Chat">
<HiOutlinePencilSquare />
<span>Start Chat</span>
</button>

<br/>

<div className="settings-grid">

{/* MODEL */}

<div className="field">
<label>Model Aussuchen</label>

<select
className="slct"
value={model}
onChange={(e)=>setModel(e.target.value)}
>



{/* <option value="nvidia/nemotron-nano-9b-v2:free">
NVIDIA Nemotron FREE
</option>

 <option value="arcee-ai/trinity-large-preview:free">
  Arcee- AI Trinity FREE
</option> */}

<option value="openai/gpt-oss-120b:free">
  OpenAI GPT FREE
</option>
  {/* <option value="meta-llama/llama-3.3-70b-instruct:free">
    Meta Llama 3.3 FREE
  </option> */}

</select>
</div>

{/* SYSTEM PROMPT */}

<div className="field">
<label>System Anweisung</label>

<input
value={systemPrompt}
onChange={(e)=>setSystemPrompt(e.target.value)}
placeholder="Kurze und klare Antworten geben."
/>

</div>

</div>

{/* ALT BUTONLAR */}

<div className="bottom">

<span>Gespräche: {messages.length}</span>

<button onClick={clearChat} disabled={isSending}>
<AiOutlineClear />
</button>

{/* <button onClick={stop} disabled={!isSending}>
<BsStopCircle />
</button> */}

{error && <span className="error">Fehler: {error}</span>}

</div>

<br/>

{/* CHAT HISTORY */}

<div
className="historyHeader"
onClick={() => setOpenHistory(!openHistory)}
>

<h4>Chat History</h4>

<FiChevronDown
className={`chevron ${openHistory ? "rotate" : ""}`}
/>

</div>

<div className={`historyContainer ${openHistory ? "open" : ""}`}>

{chats?.map(chat => (

<div key={chat.id} className="chatItem">

<span
className="chatTitle"
onClick={() => loadChat(chat)}
>
{chat.title}
</span>

<div className="chatActions">

<button
className="btnrename"
onClick={() => renameChat(chat.id)}
title="Rename Chat"
>

<PiPencilSimpleLine />

</button>

<button
className="btnclose"
onClick={() => deleteChat(chat.id)}
title="Delete Chat"
>

<AiOutlineClose />

</button>

</div>

</div>

))}

</div>

</div>
);
}