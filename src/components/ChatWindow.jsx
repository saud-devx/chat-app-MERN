import React, { useState, useEffect } from "react";
import {
  FaPaperclip,
  FaSmile,
  FaCamera,
  FaPaperPlane,
  FaPowerOff,
} from "react-icons/fa";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChatWindow = ({ currentUser }) => {
  const   user = JSON.parse(localStorage.getItem("user"));
  const getCurrentTime = () => format(new Date(), "hh:mm a");
  const navigate = useNavigate();
  const [status, setStatus] = useState("online");

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleLogout = () => {
      // toast.error(data.message || "logout failed");
      localStorage.removeItem("user");
      navigate("/login");

  };
  const addEmoji = (emoji) => {
    setInput((prev) => prev + emoji.native);
  };
  const [messages, setMessages] = useState([
    { from: "them", text: "Hey! ", time: getCurrentTime() },
    { from: "me", text: "Hi soulmate ", time: getCurrentTime() },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      from: "me",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMsg]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    const checkStatus = () => {
      const lastActive = localStorage.getItem("lastActive");
      if (!lastActive) return;

      const diffMinutes = Math.floor((Date.now() - Number(lastActive)) / 60000);
      if (diffMinutes < 1) {
        setStatus("Online");
      } else {
        setStatus(`Last seen ${diffMinutes} min ago`);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-200 items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-md sm:max-w-xl bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 text-white px-4 py-3 justify-between flex items-center gap-3 shadow-sm">
          <img
           src={`https://chat-app-mern-i2ao.onrender.com/uploads/${user.avatar}`}

            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
          />
          <div>
            <p className="text-md font-semibold">
              {currentUser?.username || "Ant-ul-Hayat"}
            </p>
            {/* <p className="text-xs text-white/80">online</p> */}
            <p className="text-xs text-white/80">{status}</p>
          </div>
          {/* Logout button */}
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 rounded-full hover:bg-red-600 transition-colors"
          >
            <FaPowerOff className="text-white hover:text-white" size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-white">
          {messages.map((msg, idx) =>
            msg.from === "me" ? (
              <div key={idx} className="flex justify-end">
                <div className="bg-green-100 text-gray-900 rounded-lg px-4 py-2 max-w-xs shadow-sm">
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs text-gray-400 block text-right">
                    {msg.time}
                  </span>
                </div>
              </div>
            ) : (
              <div key={idx} className="flex items-start">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">
                  {/* AH */}
                  <img
                    src={`/uploads/${user.avatar}`}
                    alt="User avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                </div>
                <div className="bg-gray-100 text-gray-900 rounded-lg px-4 py-2 max-w-xs shadow-sm">
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs text-gray-500 block text-right">
                    {msg.time}
                  </span>
                </div>
              </div>
            )
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-3 bg-gray-50 border-t flex items-center gap-3">
          <button className="text-gray-500 hover:text-green-500">
            <FaPaperclip size={18} />
          </button>
          <button
            className="text-gray-500 hover:text-green-500"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            <FaSmile size={18} />
          </button>
          <button className="text-gray-500 hover:text-green-500">
            <FaCamera size={18} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message"
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            onClick={handleSend}
            className="text-green-500 hover:text-green-600 transition"
          >
            <FaPaperPlane size={20} />
          </button>
        </div>
        {showEmojiPicker && (
          <div className="absolute bottom-12 left-0 z-10">
            {/* <Picker data={data} onEmojiSelect={addEmoji} theme="light" /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
