// src/services/chatService.js
import { io } from 'socket.io-client';

const socket = io('https://chat-app-mern-i2ao.onrender.com'); // backend URL

export default socket;
