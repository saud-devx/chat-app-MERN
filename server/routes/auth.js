const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const users = []; // In-memory user store. Replace with DB later

// Avatar upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// Register
router.post('/register', upload.single('avatar'), (req, res) => {
  const { username, password } = req.body;
  const avatar = req.file?.filename;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }

  const exists = users.find(u => u.username === username);
  if (exists) return res.status(409).json({ message: 'Username already taken.' });

  const newUser = { username, password, avatar };
  users.push(newUser);

  res.status(201).json({ message: 'User registered', user: newUser });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  res.json({ message: 'Login successful', user });
  
});

module.exports = router;
