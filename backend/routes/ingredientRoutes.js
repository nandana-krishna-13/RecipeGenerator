const express = require('express');
const axios = require('axios');
const router = express.Router();

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

router.get('/ingredients/:dish', async (req, res) => {
  const dishName = req.params.dish;

  try {
    const searchRes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        query: dishName,
        number: 1,
        apiKey: SPOONACULAR_API_KEY
      }
    });

    if (!searchRes.data.results.length) {
      return res.status(404).json({ error: 'Dish not found' });
    }

    const recipeId = searchRes.data.results[0].id;

    const infoRes = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
      params: { apiKey: SPOONACULAR_API_KEY }
    });

    const ingredients = infoRes.data.extendedIngredients.map(ing => ing.original);

    res.json({ ingredients });

  } catch (err) {
    console.error('Backend Error fetching ingredients:', err.message);
    res.status(500).json({ error: 'Failed to fetch ingredients' });
  }
});

module.exports = router;
