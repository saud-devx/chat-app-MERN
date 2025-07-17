const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth');
const path = require('path');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Your frontend port
    methods: ['GET', 'POST'],
  },
});

// Basic socket.io handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('send-message', (data) => {
    socket.broadcast.emit('receive-message', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded avatars
app.use('/uploads', express.static('uploads'));


// Routes
app.use('/api', authRoutes);

// Start the server
server.listen(5000, () => {
  console.log('Server running with socket.io on port 5000');
});
