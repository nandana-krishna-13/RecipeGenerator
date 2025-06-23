const express = require('express');
const router = express.Router();
const Query = require('../models/query.model');

// Save a query
router.post('/save', async (req, res) => {
  const { question, response } = req.body;
  try {
    const saved = await Query.create({ question, response });
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Failed to save query:", error);
    res.status(500).json({ error: 'Failed to save query' });
  }
});

// Get recent query history
router.get('/history', async (req, res) => {
  try {
    const queries = await Query.find().sort({ timestamp: -1 }).limit(50);
    res.json(queries);
  } catch (error) {
    console.error("❌ Failed to fetch history:", error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;
