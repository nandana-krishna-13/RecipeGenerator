const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');
const ChatQuery = require('../models/ChatQuery');
const ChatSession = require('../models/ChatSession');

// ✅ POST /api/chatbot
router.post('/', async (req, res) => {
  const { message, sessionId, saveToHistory } = req.body;

  try {
    // Load past messages if sessionId is provided
    let previousMessages = [];
    if (sessionId) {
      const session = await ChatSession.findById(sessionId);
      if (session) {
        previousMessages = session
          ? session.messages.map(({ role, content }) => ({ role, content }))
          : [];

        console.log("🧠 Found session:", sessionId, "with", previousMessages.length, "messages");
      } else {
        console.log("⚠️ sessionId provided but not found in DB");
      }
    }

    const messages = [
      { role: 'system', content: 'You are a helpful cooking assistant. Answer food-related questions with clarity and accuracy.' },
      ...previousMessages,
      { role: 'user', content: message }
    ];

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages,
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

    let session;

    if (sessionId) {
      console.log("🔄 Updating existing session:", sessionId);
      session = await ChatSession.findByIdAndUpdate(
        sessionId,
        {
          $push: {
            messages: [
              { role: 'user', content: message },
              { role: 'assistant', content: reply }
            ]
          }
        },
        { new: true }
      );
    } else {
      console.log("🆕 Creating new session");
      session = await ChatSession.create({
        messages: [
          { role: 'user', content: message },
          { role: 'assistant', content: reply }
        ]
      });

      if (saveToHistory) {
        console.log("📚 Creating new ChatQuery entry");
        await ChatQuery.create({
          question: message,
          response: reply,
          sessionId: session._id
        });
      } else {
        console.log("⛔ Not saving to ChatQuery because saveToHistory is false");
      }
    }

    res.json({ reply, sessionId: session._id });

  } catch (error) {
    console.error('❌ Chatbot error:', error.response?.data || error.message);
    res.status(500).json({ reply: "❌ Error: Unable to get response from Groq." });
  }
});



// ✅ GET full session by ID
router.get('/session/:id', async (req, res) => {
  try {
    const session = await ChatSession.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session.messages);
  } catch (err) {
    console.error("❌ Failed to fetch session:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET Previous Queries (summary)
router.get('/history', async (req, res) => {
  try {
    const history = await ChatQuery.find().sort({ timestamp: -1 }).limit(10);
    res.json(history);
  } catch (err) {
    console.error("❌ Failed to fetch history:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ DELETE summary query
router.delete('/:id', async (req, res) => {
  try {
    const result = await ChatQuery.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id));
    if (!result) return res.status(404).json({ message: "Query not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("❌ Deletion error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
