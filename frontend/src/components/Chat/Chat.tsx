import { useEffect, useRef } from "react";
import "./Chat.styles.css";
import { observer } from "mobx-react-lite";
import { chatState } from "../../state/chat-state";

export const Chat: React.FC = observer(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatState.chat.length]);

  return (
    <div className="chat-container" ref={containerRef}>
      <div className="chat-content">
        {chatState.chat.map((msg) => {
          return (
            <div key={msg.user + "_" + msg.sendAt} className="message-wrapper">
                <div className="message-content">{msg.message}</div>
                <div className="message-footer">
                <div className="message-author">{msg.user}</div>
                <div className="message-time">{msg.sendAt}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
