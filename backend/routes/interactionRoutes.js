
const express = require('express');
const router = express.Router();
const Interaction = require('../models/interaction');
const Recipe = require('../models/Recipe');

// Save a recipe
router.post('/save', async (req, res) => {
  const { userId, recipeId } = req.body;
  let record = await Interaction.findOne({ userId });

  if (!record) {
    record = new Interaction({ userId, savedRecipes: [recipeId] });
  } else if (!record.savedRecipes.includes(recipeId)) {
    record.savedRecipes.push(recipeId);
  }

  await record.save();
  res.json({ message: 'Recipe saved' });
});

// Like a recipe
router.post('/like', async (req, res) => {
  const { userId, recipeId } = req.body;
  let record = await Interaction.findOne({ userId });

  if (!record) {
    record = new Interaction({ userId, likedRecipes: [recipeId] });
  } else if (!record.likedRecipes.includes(recipeId)) {
    record.likedRecipes.push(recipeId);
  }

  await record.save();
  res.json({ message: 'Recipe liked' });
});

// Add posted recipe
router.post('/post', async (req, res) => {
  const { userId, recipeId } = req.body;
  let record = await Interaction.findOne({ userId });

  if (!record) {
    record = new Interaction({ userId, postedRecipes: [recipeId] });
  } else {
    record.postedRecipes.push(recipeId);
  }

  await record.save();
  res.json({ message: 'Recipe recorded as posted' });
});

// Fetch all profile data
router.get('/profile/:userId', async (req, res) => {
  const { userId } = req.params;
  const record = await Interaction.findOne({ userId })
    .populate('savedRecipes')
    .populate('likedRecipes')
    .populate('postedRecipes');

  if (!record) return res.json({ savedRecipes: [], likedRecipes: [], postedRecipes: [] });
  res.json(record);
});

module.exports = router;
