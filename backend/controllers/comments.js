const Comment = require('../models/comment');
const axios = require('axios');
const BASE_URL = 'https://api.jikan.moe/v4';
const { getAnimeDetails, searchAnime } = require('./anime');

// Import any necessary modules or dependencies

// Define your controller functions
function getAllComments(req, res) {
    Comment.find({}, (err, comments) => {
        if (err) {
            res.status(500).json({ error: 'Failed to retrieve comments' });
        } else {
            res.status(200).json(comments);
        }
    });
}

function getCommentById(req, res) {
    const commentId = req.params.id;
    Comment.findById(commentId, (err, comment) => {
        if (err) {
            res.status(500).json({ error: 'Failed to retrieve comment' });
        } else if (!comment) {
            res.status(404).json({ error: 'Comment not found' });
        } else {
            res.status(200).json(comment);
        }
    });
}

function createComment(req, res) {
    const { content } = req.body;
    const newComment = new Comment({ content });
    newComment.save((err, savedComment) => {
        if (err) {
            res.status(500).json({ error: 'Failed to create comment' });
        } else {
            res.status(201).json(savedComment);
        }
    });
}

function updateComment(req, res) {
    const commentId = req.params.id;
    const { content } = req.body;
    Comment.findByIdAndUpdate(commentId, { content }, { new: true }, (err, updatedComment) => {
        if (err) {
            res.status(500).json({ error: 'Failed to update comment' });
        } else if (!updatedComment) {
            res.status(404).json({ error: 'Comment not found' });
        } else {
            res.status(200).json(updatedComment);
        }
    });
}

function deleteComment(req, res) {
    const commentId = req.params.id;
    Comment.findByIdAndDelete(commentId, (err, deletedComment) => {
        if (err) {
            res.status(500).json({ error: 'Failed to delete comment' });
        } else if (!deletedComment) {
            res.status(404).json({ error: 'Comment not found' });
        } else {
            res.status(200).json({ message: 'Comment deleted successfully' });
        }
    });
}

// Export the controller functions
module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
};
