
// comments.js
const express = require('express')
const {
  createComment,
  getAllComments,
  getCommentsByAnimeId,
  getCommentById,
  updateCommentById,
  deleteCommentById
} = require('../controllers/comments')
const router = express.Router()

// Create a new comment
router.post('/', createComment)

// Read all comments for a specific anime
router.get('/anime/:animeId', getCommentsByAnimeId)

// Read a single comment by ID
router.get('/:id', getCommentById)

// Update a comment by ID
router.put('/:id', updateCommentById)

// Delete a comment by ID
router.delete('/:id', deleteCommentById)

module.exports = router