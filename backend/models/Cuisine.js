// models/Cuisine.js
const mongoose = require('mongoose');

const cuisineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  region: String,
  image: String,
  description: String,
  popularDishes: [String]
});

module.exports = mongoose.model('Cuisine', cuisineSchema);
