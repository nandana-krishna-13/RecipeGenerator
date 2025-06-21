const express = require('express');
const axios = require('axios');
const router = express.Router();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

router.get('/:dish', async (req, res) => {
  const dishName = req.params.dish;

  try {
    const prompt = `List the main ingredients required to prepare "${dishName}" as a bullet-point checklist.`;

    const groqRes = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-8b-8192', // or other supported model like `llama3-70b-8192`
        messages: [
          {
            role: 'system',
            content: 'You are a helpful cooking assistant.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = groqRes.data.choices[0].message.content;

    // Optional: convert bullet points to an array
    const ingredients = reply
      .split('\n')
      .map(line => line.replace(/^[-*•]\s*/, '').trim())
      .filter(line => line.length > 0);

    res.json({ ingredients });

  } catch (err) {
    console.error('Groq API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch ingredients using Groq' });
  }
});

module.exports = router;
