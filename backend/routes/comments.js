
//routes for comments.js 
import express from 'express';
import Comment from '../models/Comment.js';
const router = express.Router();

// GET all comments for a specific anime
router.get('/:animeId', async (req, res) => {
    try {
        const comments = await Comment.find({ animeId: req.params.animeId });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments' });
    }
});

// POST a new comment
router.post('/', async (req, res) => {
    const { animeId, userId, username, text } = req.body;
    try {
        const newComment = new Comment({ animeId, userId, username, text });
        const savedComment = await newComment.save();
        res.json(savedComment);
    } catch (error) {
        res.status(500).json({ message: 'Error posting comment' });
    }
});

// DELETE a comment
router.delete('/:commentId', async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.commentId);
        res.json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment' });
    }
});

// UPDATE a comment
router.put('/:commentId', async (req, res) => {
    const { text } = req.body;
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            { text },
            { new: true }
        );
        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating comment' });
    }
});

export default router;






// const express = require('express');
// const router = express.Router();
// const Comment = require('../models/comment'); //import the Comment model
// const ensureLoggedIn = require('../middleware/ensureLoggedIn'); 

// // GET all comments
// router.get('/', async (req, res) => {
//     try {
//         const comments = await Comment.find().populate('user').populate('post');
//         res.json(comments);
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to fetch comments', error: err });
//     }
// });

// // POST a new comment
// router.post('/', async (req, res) => {
//     try {
//         const comment = new Comment({
//             text: req.body.text,
//             user: req.user._id, // The user ID is automatically added to the request object by the checkToken middleware
//             post: req.body.postId // The post ID should be passed in the request body
//         });
//         await comment.save();
//         res.status(201).json(comment);
//     } catch (err) {
//         res.status(400).json({ message: 'Failed to create comment', error: err });
//     }
// });

// // PUT/update a comment by ID
// router.put('/:id', async (req, res) => {
//     try {
//         const comment = await Comment.findByIdAndUpdate(
//             req.params.id,
//             { text: req.body.text },
//             { new: true, runValidators: true }
//         );
//         if (!comment) return res.status(404).json({ message: 'Comment not found' });
//         res.json(comment);
//     } catch (err) {
//         res.status(400).json({ message: 'Failed to update comment', error: err });
//     }
// });

// // DELETE a comment by ID
// router.delete('/:id', async (req, res) => {
//     try {
//         const comment = await Comment.findByIdAndDelete(req.params.id);
//         if (!comment) return res.status(404).json({ message: 'Comment not found' });
//         res.json({ message: 'Comment deleted' });
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to delete comment', error: err });
//     }
// });

// module.exports = router;
