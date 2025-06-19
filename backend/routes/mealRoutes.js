const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealPlan');

// Save/Update meal plan
router.post('/save', async (req, res) => {
  const { userId, week } = req.body;
  try {
    console.log('Saving meal plan for user:', userId);
    console.log('Week data received:', JSON.stringify(week, null, 2));

    let plan = await MealPlan.findOne({ userId });
    if (plan) {
      plan.week = week;
      await plan.save();
      console.log('Meal plan updated successfully.');
    } else {
      await MealPlan.create({ userId, week });
      console.log('New meal plan created.');
    }

    res.json({ message: 'Meal plan saved.' });
  } catch (err) {
    console.error('Error saving meal plan:', err);
    res.status(500).json({ error: 'Error saving meal plan.' });
  }
});

// Get meal plan
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    console.log('Fetching meal plan for user:', userId);
    const plan = await MealPlan.findOne({ userId });
    res.json(plan?.week || {});
  } catch (err) {
    console.error('Error fetching meal plan:', err);
    res.status(500).json({ error: 'Error fetching meal plan.' });
  }
});

module.exports = router;
