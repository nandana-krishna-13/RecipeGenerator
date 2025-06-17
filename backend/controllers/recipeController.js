const axios = require('axios');

exports.getRecipesByIngredients = async (req, res) => {
  const { ingredients } = req.body; // expects array of ingredients

  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        ingredients: ingredients.join(','),
        number: 5,
        apiKey: process.env.SPOONACULAR_API_KEY
      }
    });

    res.json(response.data); // list of recipes with title, image, id, used/unused ingredients
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};
