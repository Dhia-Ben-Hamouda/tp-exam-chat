const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory message storage
let messages = [
  {
    id: 1,
    author: 'System',
    content: 'Bienvenue dans le chat ! 👋',
    timestamp: new Date().toISOString()
  }
];
let nextId = 2;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// GET /api/messages — return all messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// POST /api/messages — add a message
app.post('/api/messages', (req, res) => {
  const { author, content } = req.body;

  if (!author || !content) {
    return res.status(400).json({ error: 'author and content are required' });
  }

  if (author.trim().length === 0 || content.trim().length === 0) {
    return res.status(400).json({ error: 'author and content cannot be empty' });
  }

  const message = {
    id: nextId++,
    author: author.trim(),
    content: content.trim(),
    timestamp: new Date().toISOString()
  };

  messages.push(message);
  res.status(201).json(message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});