import React, { useState, useEffect } from "react";
import axios from "axios";

const AIChatAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(`session-${Date.now()}`); // Unique session for each user
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const fullText = "Hey 👋 I'm XIGI Assistant! Ready to explore LED panels?";
    let index = 0;
    setIsTyping(true);
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setMessages([{ type: "buttons", reply: fullText.slice(0, index + 1), buttons: index === fullText.length - 1 ? ["Indoor Panels", "Outdoor Panels"] : [] }]);
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 50); // Adjust speed as needed
  }, []);

  const sendMessage = async (messageText = null) => {
    console.log('sendMessage called with:', messageText);
    const msgToSend = messageText || input.trim();
    console.log('msgToSend:', msgToSend);

    if (!msgToSend) return;

    // Add user message
    setMessages(prev => [...prev, { type: "user", text: msgToSend }]);
    if (!messageText) setInput("");

    setIsTyping(true);
    setTimeout(async () => {
      try {
        console.log('Making axios request...');
        // Call your Django backend
        const response = await axios.post("http://localhost:8000/api/alexa/chat/", {
          session_id: sessionId,
          message: msgToSend
        });

        console.log('Response data:', response.data);

        if (response.data) {
          if (response.data.type === "buttons") {
            setMessages(prev => [
              ...prev,
              { type: "buttons", reply: response.data.reply, buttons: response.data.buttons }
            ]);
          } else if (response.data.reply) {
            setMessages(prev => [
              ...prev,
              { type: "system", text: response.data.reply }
            ]);
          }
        } else {
          // Handle empty response or no data
          setMessages(prev => [
            ...prev,
            { type: "system", text: "No response from assistant." }
          ]);
        }
      } catch (error) {
        setMessages(prev => [
          ...prev,
          { type: "system", text: "Error connecting to AI assistant." }
        ]);
        console.error(error);
      }
      setIsTyping(false);
    }, 1000); // 1 second delay for typing indicator
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "300px",
          marginBottom: "10px",
          overflowY: "auto"
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.type === "user" ? "right" : "left",
              margin: "5px 0"
            }}
          >
            {msg.type === "buttons" ? (
              <div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    backgroundColor: "#e2e3e5",
                    marginBottom: "5px"
                  }}
                >
                  {msg.reply}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {msg.buttons.map((button, btnIdx) => (
                    <button
                      key={button}
                      type="button"
                      onClick={() => sendMessage(button)}
                      style={{
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "6px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "14px"
                      }}
                    >
                      {button}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  backgroundColor: msg.type === "user" ? "#cce5ff" : "#e2e3e5"
                }}
              >
                {msg.text}
              </span>
            )}
          </div>
        ))}
        {isTyping && (
          <div style={{ textAlign: "left", margin: "5px 0" }}>
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "12px",
                backgroundColor: "#e2e3e5",
                color: "#666"
              }}
            >
              XIGI Assistant is typing...
            </span>
          </div>
        )}
      </div>

      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
          placeholder="Type your message..."
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={{ padding: "8px 16px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatAssistant;
