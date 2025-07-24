// src/context/SocketContext.jsx
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("https://chat-app-mern-i2ao.onrender.com");

    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
