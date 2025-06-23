const mongoose = require('mongoose');

const ChatQuerySchema = new mongoose.Schema({
  question: String,
  response: String,
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatSession'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ChatQuery', ChatQuerySchema);
