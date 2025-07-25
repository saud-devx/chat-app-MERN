const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require("./routes/user");




const app = express();
const server = http.createServer(app);

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));

const io = new Server(server, {
  cors: {
    origin: [
      // "http://localhost:5173",
      "https://chat-app-mern-tawny.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Basic socket.io handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // socket.on('send-message', (data) => {
  //   socket.broadcast.emit('receive-message', data);
  // });
  io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("joinRoom", ({ senderId, receiverId }) => {
    const roomId = [senderId, receiverId].sort().join("_");
    socket.join(roomId);
  });

  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const roomId = [senderId, receiverId].sort().join("_");
    io.to(roomId).emit("receiveMessage", { senderId, message });
  });
});

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Middleware

app.use(cors({
  origin: "https://chat-app-mern-tawny.vercel.app", // your frontend
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);

// Serve uploaded avatars
// app.use('/uploads', express.static('uploads'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes
app.use('/api', authRoutes);

// Start the server
server.listen(5000, () => {
  console.log('Server running with socket.io on port 5000');
});
