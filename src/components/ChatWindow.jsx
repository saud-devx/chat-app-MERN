// ChatWindow.jsx
import React, { useState } from "react";

const ChatWindow = ({ currentUser, selectedUser }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = {
      from: currentUser.username,
      to: selectedUser.username,
      text: input.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMsg]);
    setInput("");
  };

  if (!selectedUser) {
    return (
      <div className="h-full flex items-center justify-center text-gray-600 text-xl">
        Select a user to chat with
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">
        Chatting with {selectedUser.username}
      </h2>

      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.from === currentUser.username ? "text-right" : "text-left"
            }`}
          >
            <div className="inline-block bg-white px-4 py-2 rounded shadow">
              <p>{msg.text}</p>
              <small className="text-xs text-gray-500">{msg.time}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          className="flex-1 border rounded-l px-4 py-2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
