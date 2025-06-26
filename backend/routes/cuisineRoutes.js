// routes/cuisineRoutes.js
const express = require('express');
const router = express.Router();
const Cuisine = require('../models/Cuisine');

// Get all cuisines or filtered by search
router.get('/', async (req, res) => {
  try {
    const search = req.query.q;
    const query = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};
    const cuisines = await Cuisine.find(query);
    res.json(cuisines);
  } catch (err) {
    console.error('Error fetching cuisines:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
