// src/services/chatService.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5173'); // backend URL

export default socket;
