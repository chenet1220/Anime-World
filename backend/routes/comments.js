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

// GET a specific comment by ID
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('user').populate('post');
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        res.json(comment);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch comment', error: err });
    }
});

// POST a new comment
router.post('/', async (req, res) => {
    try {
        const comment = new Comment({
            text: req.body.text,
            user: req.user._id, // the user is logged in and available in req.user
            post: req.body.postId // The post ID should be passed in the request body
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create comment', error: err });
    }
});

// PUT/update a comment by ID
router.put('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { text: req.body.text },
            { new: true, runValidators: true }
        );
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        res.json(comment);
    } catch (err) {
        res.status(400).json({ message: 'Failed to update comment', error: err });
    }
});

// DELETE a comment by ID
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete comment', error: err });
    }
});

module.exports = router;
