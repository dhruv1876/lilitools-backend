const express = require('express');
const app = express();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
app.use(express.json());

// Single AI route for all tools
app.post('/api/ai', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
    
    const response = await fetch(geminiURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      })
    });

    const result = await response.json();
    const aiText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    res.json({ text: aiText });

  } catch (error) {
    console.error('AI API Error:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});
