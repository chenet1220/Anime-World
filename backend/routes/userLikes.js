const express = require('express');
const router = express.Router();
const { likeAnime, getAnimeLikes } = require('../controllers/userLikes');

// route to like an anime 
router.post('/like', likeAnime);

// route to get total likes for an anime
router.get('/:anime/likes', getAnimeLikes);

module.exports = router;