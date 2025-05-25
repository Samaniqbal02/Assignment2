// app.js

// Import modules
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));  // Parse form data
app.use(express.static('public'));                    // Serve static files (css, js, images)
app.use(expressLayouts);                              // Use express-ejs-layouts middleware

// EJS setup
app.set('view engine', 'ejs');
app.set('layout', 'layout'); // Set default layout (views/layout.ejs)

// Routes
const transactionRoutes = require('./routes/transactionRoutes');
app.use('/', transactionRoutes);  // Use routes defined in transactionRoutes.js

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
