// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Allowed origins (Blogger + your domain)
const ALLOWED_ORIGINS = [
  'https://www.lilitools.com',
  'https://lilitools.com'
];

app.use(cors({
  origin: function (origin, cb) {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('CORS blocked for origin: ' + origin));
    }
  }
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // for xl_max.js

const API_KEY = process.env.API_KEY; // set in Render environment variables
if (!API_KEY) {
  console.error('❌ ERROR: API_KEY is missing. Set it in Render environment.');
  process.exit(1);
}

// Simple test route
app.get('/api/config', (req, res) => {
  res.json({ status: 'ok', origin: req.get('origin') || null });
});

// Unified AI route
app.post('/api/ai', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    };

    const r = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const json = await r.json();
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;

    if (!text) {
      return res.status(502).json({ error: 'No text from AI', details: json });
    }

    res.json({ text });
  } catch (err) {
    console.error('Error in /api/ai:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Start server with Render's port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
