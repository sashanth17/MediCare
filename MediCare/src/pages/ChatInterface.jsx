// GeminiChatSimple.jsx
import React, { useState, useRef, useEffect } from "react";

export default function GeminiChatSimple() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  const messagesEndRef = useRef(null);

  const handleStartChat = () => {
    setShowWelcome(false);
    setMessages([
      {
        id: Date.now(),
        sender: "bot",
        text: "Hello! How can I assist you today?",
      },
    ]);
  };

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() && files.length === 0) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text: input.trim(), files: [...files] },
    ]);
    setInput("");
    setFiles([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleVoice = () => {
    alert("Voice recording triggered!");
  };

  // Welcome Screen
  if (showWelcome) {
    return (
      <div className="flex flex-col h-screen w-full max-w-4xl mx-auto items-center justify-center bg-gradient-to-b from-indigo-50 to-indigo-100 rounded-lg shadow-lg p-6 text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">
          Welcome to Medicare Chat Assistant
        </h1>
        
        <button
          onClick={handleStartChat}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90"
        >
          Start Chat
        </button>
      </div>
    );
  }

  // Main Chat Interface
  return (
    <div className="flex flex-col h-screen w-full max-w-4xl mx-auto border rounded-lg overflow-hidden bg-gradient-to-b from-indigo-50 to-indigo-100 shadow-lg">
      {/* Messages */}
      <div
        className={`flex-1 overflow-auto p-6 space-y-3 ${dragOver ? "border-4 border-dashed border-pink-400" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            {msg.text && (
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl break-words shadow-md my-1 text-sm ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none border"
                }`}
              >
                {msg.text}
              </div>
            )}
            {msg.files &&
              msg.files.map((f, idx) => {
                const isImage = f.type.startsWith("image/");
                return isImage ? (
                  <img
                    key={idx}
                    src={URL.createObjectURL(f)}
                    alt={f.name}
                    className="max-w-[70%] mt-1 rounded-lg shadow-sm inline-block"
                  />
                ) : (
                  <div
                    key={idx}
                    className="max-w-[70%] mt-1 px-2 py-1 text-sm text-gray-700 inline-block border rounded"
                  >
                    {f.name}
                  </div>
                );
              })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white sticky bottom-0 flex flex-col gap-2 shadow-inner">
        <div className="flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Type your message..."
            className="flex-1 resize-none rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
          />
          {/* Microphone icon */}
          <button
            onClick={handleVoice}
            className="flex items-center justify-center w-12 h-12 hover:text-purple-500 text-purple-700"
            title="Record Voice"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 0014 0h-2zm-5 9a7 7 0 007-7h-2a5 5 0 01-10 0H5a7 7 0 007 7z" />
            </svg>
          </button>
          {/* File upload */}
          <label className="flex items-center text-3xl hover:text-pink-500 cursor-pointer">
            📎
            <input type="file" multiple onChange={handleFiles} className="hidden" />
          </label>
          <button
            onClick={handleSend}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-95"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
