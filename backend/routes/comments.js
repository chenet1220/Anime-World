const express = require('express');
const router = express.Router();
const Comment = require('../models/comment'); // Import the Comment model

// GET all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().populate('user').populate('post');
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch comments', error: err });
    }
});

