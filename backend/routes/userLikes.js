const express = require('express');
const router = express.Router();
const { likeAnime, getAnimeLikes } = require('../controllers/userLikes');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// route to like an anime 
router.post('/like', ensureLoggedIn, likeAnime);

// route to get total likes for an anime
router.get('/likes/:anime', getAnimeLikes);

module.exports = router;
