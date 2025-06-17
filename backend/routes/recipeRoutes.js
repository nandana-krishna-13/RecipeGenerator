const express = require('express');
const router = express.Router();
const { getRecipesByIngredients } = require('../controllers/recipeController');

router.post('/generate', getRecipesByIngredients);

module.exports = router;
