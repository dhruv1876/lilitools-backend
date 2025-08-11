const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables
dotenv.config();

const app = express();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const PORT = process.env.PORT || 3000;

// Initialize Gemini AI
let genAI;
if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('./'));


// Single AI route for all tools
app.post('/api/ai', async (req, res) => {
  const { contents } = req.body;
  console.log('Received request:', JSON.stringify(req.body, null, 2));

  if (!contents || !Array.isArray(contents) || contents.length === 0) {
    return res.status(400).json({ error: 'Contents array is required' });
  }

  try {
    if (!genAI || !GEMINI_API_KEY) {
      console.log('Gemini API not configured, using fallback response');
      const fallbackText = "I'm a helpful AI assistant. Please configure your Gemini API key to enable full functionality.";
      return res.json({
        candidates: [{
          content: {
            parts: [{ text: fallbackText }]
          }
        }]
      });
    }

    // Extract the prompt from the contents
    const prompt = contents[0]?.parts?.[0]?.text || contents[0]?.role === 'user' ? contents[0].parts[0].text : '';
    
    if (!prompt) {
      return res.status(400).json({ error: 'No prompt found in contents' });
    }

    console.log('Processing prompt with Gemini AI:', prompt);
    
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Gemini AI response:', text);
    
    // Return response in the format expected by frontend
    res.json({
      candidates: [{
        content: {
          parts: [{ text: text }]
        }
      }]
    });

  } catch (error) {
    console.error('AI API Error:', error);
    
    // Return error in expected format
    const errorText = `Sorry, I encountered an error while processing your request: ${error.message}`;
    res.json({
      candidates: [{
        content: {
          parts: [{ text: errorText }]
        }
      }]
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/ai`);
});
