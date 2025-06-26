const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  likedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  postedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
});

module.exports = mongoose.model('Interaction', interactionSchema);
