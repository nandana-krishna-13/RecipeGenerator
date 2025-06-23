const express = require('express');
const router = express.Router();
const axios = require('axios');
const ChatQuery = require('../models/ChatQuery'); // ✅ import the model
const mongoose = require('mongoose');



// POST /api/chatbot
router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: 'You are a helpful cooking assistant. Answer food-related questions with clarity and accuracy.' },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content.trim();

    // ✅ Save the query to MongoDB
    await ChatQuery.create({ question: message, response: reply });

    res.json({ reply });

  } catch (error) {
    console.error('❌ Groq API error:', error.response?.data || error.message);
    res.status(500).json({ reply: "❌ Error: Unable to get response from Groq." });
  }
});

// ✅ GET /api/chatbot/history
router.get('/history', async (req, res) => {
  try {
    const history = await ChatQuery.find().sort({ timestamp: -1 }).limit(10);
    res.json(history);
  } catch (err) {
    console.error("❌ Failed to fetch history:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ➕ ADD THIS DELETE route
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ChatQuery.findByIdAndDelete(new mongoose.Types.ObjectId(id));
    
    if (!result) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("❌ Deletion error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
