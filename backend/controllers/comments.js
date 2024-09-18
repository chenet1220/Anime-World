const Comment = require('../models/comments')

// Create a new comment
const createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body)
    await comment.save()
    res.status(201).send(comment)
  } catch (error) {
    res.status(400).send(error)
  }
}

// Read all comments for a specific anime
const getCommentsByAnimeId = async (req, res) => {
  try {
    const comments = await Comment.find({ animeId: req.params.animeId })
    res.status(200).send(comments)
  } catch (error) {
    res.status(500).send(error)
  }
}

// Read a single comment by ID
const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('userId')
    if (!comment) {
      return res.status(404).send()
    }
    res.status(200).send(comment)
  } catch (error) {
    res.status(500).send(error)
  }
}

// Update a comment by ID
const updateCommentById = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['text', 'author'] // Add other fields that can be updated
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const comment = await Comment.findById(req.params.id)
    if (!comment) {
      return res.status(404).send()
    }

    updates.forEach((update) => (comment[update] = req.body[update]))
    await comment.save()
    res.status(200).send(comment)
  } catch (error) {
    res.status(400).send(error)
  }
}

// Delete a comment by ID
const deleteCommentById = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id)
    if (!comment) {
      return res.status(404).send()
    }
    res.status(200).send(comment)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  createComment,
  getCommentsByAnimeId,
  getCommentById,
  updateCommentById,
  deleteCommentById
}