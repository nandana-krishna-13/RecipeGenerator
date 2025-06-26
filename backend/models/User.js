const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // ✅ Add this line
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // 🔐 Hashed
});

module.exports = mongoose.model('User', userSchema);
