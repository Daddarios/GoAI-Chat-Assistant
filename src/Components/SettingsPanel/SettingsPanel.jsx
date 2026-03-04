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
      <h2 className="hd-title">
        Go -  ÆI
      
      
      </h2>
      <div className="header-animation">

  <span className="anim-static">
    AI for
  </span>

  <ul className="anim-list">
    <li>developers</li>
    <li>creators</li>
    <li>builders</li>
    <li>everyone</li>
  </ul>

</div>
     
   <hr className="hr-line"/>
   
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
                <option value="openai/gpt-4o-mini">gpt-4o-mini</option>

                <option value="deepseek/deepseek-chat:free">deepseek free</option>
                <option value="qwen/qwen3-coder:free">qwen coder</option>

                <option value="nvidia/nemotron-nano-9b-v2:free">
                  NVIDIA Nemotron FREE
                </option>

                <option value="meta-llama/llama-3.1-8b-instruct:free">
                  llama free
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
