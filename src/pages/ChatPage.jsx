import React, { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow"; // adjust path as needed
import axios from "axios";

const ChatPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setCurrentUser(storedUser);
      fetchUsers(storedUser._id); // fetch users after setting currentUser
    }
  }, []);

  const fetchUsers = async (currentUserId) => {
    try {
      const res = await axios.get("https://chat-app-mern-i2ao.onrender.com/api/users"); // replace with your real endpoint
      const filteredUsers = res.data.filter((user) => user._id !== currentUserId);
      setUsers(filteredUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 border-r bg-white p-4">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        {users.map((user) => (
          <div
            key={user._id}
            className="cursor-pointer p-2 hover:bg-gray-200 rounded"
            onClick={() => setSelectedUser(user)}
          >
            <div className="flex items-center gap-2">
              <img
                src={`/uploads/${user.avatar}`}
                alt={user.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span>{user.username}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1">
        <ChatWindow currentUser={currentUser} selectedUser={selectedUser} />

      </div>
    </div>
  );
};

export default ChatPage;
