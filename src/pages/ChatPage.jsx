import React, { useEffect, useState } from 'react';
import ChatWindow from '../components/ChatWindow';

const ChatPage = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(storedUser);
  }, []);

  if (!currentUser) return null; // or loading spinner

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <ChatWindow currentUser={currentUser} />
    </div>
  );
};

export default ChatPage;
