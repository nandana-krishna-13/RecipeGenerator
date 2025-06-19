const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  week: {
    Mon: [String],
    Tue: [String],
    Wed: [String],
    Thu: [String],
    Fri: [String],
    Sat: [String],
    Sun: [String]
  }
});

module.exports = mongoose.model('MealPlan', mealPlanSchema);
