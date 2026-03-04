import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

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
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {content ?? "..."}
                </ReactMarkdown>
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