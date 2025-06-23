const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mealplanner', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
const recipeRoutes = require('./routes/recipeRoutes');
const mealRoutes = require('./routes/mealRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const sharingRoutes = require('./routes/sharingRoutes'); // ✅ NEW
const chatbotRoutes = require('./routes/chatbotRoutes');
const queryRoutes = require('./routes/queryRoutes');



app.use('/api/recipes', recipeRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/shared', sharingRoutes); // ✅ NEW
app.use('/api/chatbot', chatbotRoutes);  // ✅ New chatbot route
app.use('/api/queries', queryRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
