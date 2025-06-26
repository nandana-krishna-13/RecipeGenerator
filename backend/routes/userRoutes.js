const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route: Update user profile
router.put('/edit-profile/:id', async (req, res) => {
  const { name, phone, country } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, country },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
});

// GET user details by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // don't return password
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user details', error: err.message });
  }
});

module.exports = router;
