// ChatPage.jsx
import React, { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";

const ChatPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setCurrentUser(storedUser);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://chat-app-mern-i2ao.onrender.com/api/users");
        const data = await res.json();
        // remove current user from list
        const filtered = data.filter((u) => u.username !== currentUser?.username);
        setUsers(filtered);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    if (currentUser) fetchUsers();
  }, [currentUser]);

  if (!currentUser) return null;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className="cursor-pointer p-2 hover:bg-gray-100 rounded"
          >
            {user.username}
          </div>
        ))}
      </aside>

      <main className="flex-1 bg-gray-100">
        <ChatWindow currentUser={currentUser} selectedUser={selectedUser} />
      </main>
    </div>
  );
};

export default ChatPage;
