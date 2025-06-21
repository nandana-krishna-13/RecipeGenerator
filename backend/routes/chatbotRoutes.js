const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192', // or 'llama3-70b-8192'
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
    res.json({ reply });

  } catch (error) {
    console.error('❌ Groq API error:', error.response?.data || error.message);
    res.status(500).json({ reply: "❌ Error: Unable to get response from Groq." });
  }
});

module.exports = router;
