const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: String,
  text: String,
  time: String
});

const recipeSchema = new mongoose.Schema({
  title: String,
  text: String,
  name: String,
  place: String,
  image: String, // base64 or URL
  timestamp: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  comments: [commentSchema],
  saved: { type: Boolean, default: false },
  userVote: { type: String, default: 'none' }
});

module.exports = mongoose.model('Recipe', recipeSchema);

