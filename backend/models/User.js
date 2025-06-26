const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },// 🔐 Hashed
  phone: {type:String},       // Add if not already present
  country: {type:String}     // Add if not already present
});

module.exports = mongoose.model('User', userSchema);
