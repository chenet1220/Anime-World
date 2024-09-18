const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const animeRoutes = require('./routes/anime');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const commentRoutes = require('./routes/comments');
const likeRoutes = require('./routes/userLikes');

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/anime', animeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/userLikes', likeRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The express app is listening on ${port}`);
});
