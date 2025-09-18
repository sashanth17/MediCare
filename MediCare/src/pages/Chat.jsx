import React, { useEffect, useRef, useState } from "react";

const initialMessages = [
  { id: 1, text: "Hello! How can I help you?", sender: "AI" },
  { id: 2, text: "Hi! I want to know about ChatGPT UI.", sender: "User" },
  { id: 3, text: "Sure! I can explain it.", sender: "AI" },
];

const ChatWindow = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, text: input, sender: "User" },
      {
        id: prev.length + 2,
        text: "This is a sample AI response.",
        sender: "AI",
      },
    ]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full border rounded-xl shadow-md overflow-hidden">
      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[70%] px-4 py-2 rounded-2xl break-words shadow-sm ${
              msg.sender === "User"
                ? "bg-blue-500 text-white self-end rounded-br-none"
                : "bg-gray-200 text-gray-900 self-start rounded-bl-none"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {/* Typing indicator */}
        <div className="flex space-x-1 items-center mt-2 self-start">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>

      {/* Input Box */}
      <div className="flex p-3 border-t bg-white">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          rows={1}
          placeholder="Type your message..."
          className="flex-1 p-3 border rounded-l-2xl focus:outline-none resize-none"
        />
        <button
          onClick={handleSend}
          className="px-6 bg-blue-500 text-white font-semibold rounded-r-2xl hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
