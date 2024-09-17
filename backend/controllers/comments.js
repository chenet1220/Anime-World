const Comment = require('../models/commentModel');

exports.addComment = async (req, res) => {
  try {
    const { animeId, comment, rating } = req.body;
    const newComment = new Comment({
      animeId,
      comment,
      rating,
      user: req.user._id,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommentsByAnime = async (req, res) => {
  try {
    const { animeId } = req.params;
    const comments = await Comment.find({ animeId }).populate('user', 'username');
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

