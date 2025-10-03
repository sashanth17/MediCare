// src/components/ConversationModal.js

import React from "react";

function ConversationModal({ query, onClose }) {
  if (!query) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-200">
          <h2 className="text-2xl font-semibold text-slate-800">
            Conversation History
          </h2>
          <button
            onClick={onClose}
            className="text-3xl text-slate-400 hover:text-slate-600 transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="p-4">
          <p className="font-mono text-sm text-slate-500">
            <strong>Session ID:</strong> {query.sessionId}
          </p>
        </div>

        <div className="flex-grow overflow-y-auto bg-slate-50 p-4 space-y-4">
          {query.conversation.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "Patient" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-[80%] p-3 rounded-2xl">
                <p
                  className={`font-bold block mb-1 ${
                    message.sender === "Patient"
                      ? "text-blue-100"
                      : "text-slate-600"
                  }`}
                >
                  {message.sender}
                </p>
                <div
                  className={`p-3 rounded-2xl ${
                    message.sender === "Patient"
                      ? "bg-blue-500 text-white rounded-br-lg"
                      : "bg-slate-200 text-slate-800 rounded-bl-lg"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConversationModal;
