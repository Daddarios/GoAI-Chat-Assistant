import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { BsRobot } from "react-icons/bs";
import "./ChatBox.css";

export default function ChatBox({ messages, chatRef }) {

  return (
    <div ref={chatRef} className="messages">

      {messages.map((m, idx) => {

        const { role, content, files } = m;
        const isUser = role === "user";

        return (
          <div
            key={m.id || idx}
            className={`messageRow ${isUser ? "user" : "assistant"}`}
          >

            <div className="messageBubble">

              {/* 🤖 THINKING GÖSTERGES - Assistant için */}
              {role === "assistant" && (
                <div className="assistant-header">
                  <BsRobot className="bot-icon" />
                  {(!content || content === "") && (
                    <span className="thinking">
                        <div className="dot1"></div>
                        <div className="dot2"></div>
                        <div className="dot3"></div>
                        <div className="dot4"></div>
                        <div className="dot5"></div>
                        <div className="dot6"></div>
                        <div className="dot7"></div>
                        <div className="dot8"></div>
                        <div className="dot9"></div>
                        <div className="dot10"></div>
                      </span>
                  )}
                </div>
              )}

              {/* FILES */}
              {files && files.length > 0 && (
                <div className="fileChips">

                  {files.map((file, i) => {

                    const isImg = file?.type?.startsWith("image/");

                    return (
                      <div key={i} className="fileChip">

                        {isImg ? (
                          <img
                            src={file.url}
                            alt={file.name}
                            style={{
                              width: 36,
                              height: 36,
                              objectFit: "cover",
                              borderRadius: 8
                            }}
                          />
                        ) : (
                          <strong>
                            {file?.name?.split(".").pop()?.toUpperCase()}
                          </strong>
                        )}

                        <span>{file.name}</span>

                      </div>
                    );

                  })}

                </div>
              )}

              {/* CONTENT */}
              {role === "assistant" ? (
                content ? (
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {content}
                  </ReactMarkdown>
                ) : null
              ) : (
                <span>{content}</span>
              )}

            </div>

          </div>
        );

      })}

    </div>
  );
}