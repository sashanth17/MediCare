import React, { useState, useEffect, useRef } from "react";

const SimulatedChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  // The conversation script remains the same
  const chatScript = [
    "Hello! I'm your MEDI CARE A.I. How can I help you?",
    "Any pain, jaundice, or breathing issues?",
    "Do you still have any symptoms?",
    "Are you feeling unusually tired or weak?",
    "Do you have a sore throat?",
    "Thank you. Based on your symptoms, here's my quick remedy: you have cold-like symptoms, rest and fluids are recommended with citrizen. For fever and body aches, consider paracetemol. See a doctor if symptoms worsen. Take care!",
    "In your location, these medicines are available at Apollo pharmacy located in K N G Puthur, 23A/100 feet road, Gandhipuram, Coimbatore, and NATA pharmacy located in TVS Nagar, 77B Race Course Road, Coimbatore.",
  ];

  // A helper function to simulate a delay
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const runSimulation = async () => {
      for (let i = 0; i < chatScript.length; i++) {
        await sleep(1500);
        setIsTyping(true);
        await sleep(2000);

        setIsTyping(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: i, text: chatScript[i] },
        ]);
      }
    };

    runSimulation();
  }, []); // The empty dependency array ensures this runs only once

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    // Main container with background and centering (apply these classes to your root div or body)
    <div className="bg-gray-100 font-sans flex justify-center items-center min-h-screen p-4">
      {/* Chat Container */}
      <div className="w-full max-w-lg h-[80vh] max-h-[700px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="bg-blue-600 text-white p-4 flex items-center shadow-md">
          <h2 className="text-lg font-semibold">MEDI CARE A.I.</h2>
          <span className="h-2 w-2 bg-green-400 rounded-full ml-3 mr-2"></span>
          <span>Online</span>
        </div>

        {/* Message Area */}
        <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="max-w-[80%] self-start bg-gray-200 text-black px-4 py-2 rounded-2xl rounded-tl-lg leading-snug"
            >
              {msg.text}
            </div>
          ))}

          {isTyping && (
            <div className="self-start bg-gray-200 rounded-2xl rounded-tl-lg p-4 flex items-center">
              <span className="h-2 w-2 m-1 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="h-2 w-2 m-1 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="h-2 w-2 m-1 bg-gray-500 rounded-full animate-bounce"></span>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>
      </div>
    </div>
  );
};

export default SimulatedChat;
