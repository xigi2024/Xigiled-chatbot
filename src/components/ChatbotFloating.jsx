import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';

const ChatbotFloating = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const fullText = "Hey 👋 I'm XIGI Assistant! Ready to explore LED panels?";
      let index = 0;
      setIsTyping(true);
      const typingInterval = setInterval(() => {
        if (index < fullText.length) {
          setMessages([{ sender: "bot", text: fullText.slice(0, index + 1), buttons: index === fullText.length - 1 ? ["Indoor Panels", "Outdoor Panels", "Rental Panels"] : [] }]);
          index++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 50); // Adjust speed as needed
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setUserMessage("");

    setIsTyping(true);
    setTimeout(async () => {
      try {
        const response = await fetch("/api/alexa/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: "frontend-session",
            message: userMessage,
          }),
        });

        const data = await response.json();
        if (data.type === "buttons") {
          setMessages([
            ...newMessages,
            { sender: "bot", text: data.reply, buttons: data.buttons },
          ]);
        } else {
          setMessages([
            ...newMessages,
            { sender: "bot", text: data.reply || "No response received" },
          ]);
        }
      } catch (error) {
        console.error("Chatbot API error:", error);
        setMessages([
          ...newMessages,
          { sender: "bot", text: "⚠️ Failed to connect to chatbot API." },
        ]);
      }
      setIsTyping(false);
    }, 1000); // 1 second delay for typing indicator
  };

  return (
    <>
      {/* 💬 Floating Chatbot Button */}
      <button
        onClick={handleToggle}
        className="fixed bottom-[165px] right-[30px] z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        title="Chat with XIGI AI Assistant"
      >
        <FaRobot size={28} />
      </button>

      {/* 💬 Popup Chat Window */}
      {isOpen && (
        <div className="fixed bottom-[150px] right-[30px] w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-2xl flex justify-between items-center">
            <span className="font-semibold"> XIGI AI Assistant</span>
            <button onClick={handleToggle}>
              <FaTimes size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, index) => (
              <div key={index}>
                <div
                  className={`p-2 rounded-xl max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-blue-100 self-end ml-auto text-right"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  {msg.sender === "bot" ? (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
                {msg.buttons && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {msg.buttons.map((button, btnIndex) => (
                      <button
                        key={btnIndex}
                        onClick={() => {
                          setUserMessage(button);
                          setTimeout(() => handleSend(), 0);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600"
                      >
                        {button}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <div className="bg-gray-100 p-2 rounded-xl">
                  XIGI Assistant is typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t flex items-center gap-2">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg text-sm focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotFloating;
