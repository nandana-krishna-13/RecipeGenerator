const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// // POST a recipe
// router.post('/create', async (req, res) => {
//   try {
//     const recipe = new Recipe(req.body);
//     await recipe.save();
//     res.status(201).json({ message: 'Recipe saved successfully', recipe });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to save recipe' });
//   }
// });

router.post('/create', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    const savedRecipe = await recipe.save();
    res.status(201).json({
      message: 'Recipe saved successfully',
      recipe: savedRecipe,
      _id: savedRecipe._id  // ✅ Important: include this field explicitly
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save recipe' });
  }
});


// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ _id: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// POST a comment
router.post('/comment/:id', async (req, res) => {
  const { name, text, time } = req.body;
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

    recipe.comments.push({ name, text, time });
    await recipe.save();
    res.json(recipe.comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

// POST a vote (upvote or downvote)
router.post('/vote/:id', async (req, res) => {
  const { action, prevAction } = req.body;

  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

    // Undo previous action
    switch (prevAction) {
      case 'upvote':
        recipe.upvotes = Math.max(0, recipe.upvotes - 1);
        break;
      case 'downvote':
        recipe.downvotes = Math.max(0, recipe.downvotes - 1);
        break;
    }

    // Apply new action
    switch (action) {
      case 'upvote':
        recipe.upvotes++;
        break;
      case 'downvote':
        recipe.downvotes++;
        break;
    }

    await recipe.save();
    res.json({ upvotes: recipe.upvotes, downvotes: recipe.downvotes });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register vote' });
  }
});





module.exports = router;
