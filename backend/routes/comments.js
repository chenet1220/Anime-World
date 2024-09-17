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


const express = require('express');
const commentsController = require('../controllers/comments');
const checkToken = require('../middleware/checkToken');
const router = express.Router();

router.post('/:animeId', checkToken, async (req, res) => {
  const { animeId } = req.params;
  const { text, rating } = req.body;
  const userId = req.user.userId;

  const comment = new Comment({ animeId, userId, text, rating });
  await comment.save();
  res.status(201).json(comment);
});

router.put('/:commentId',checkToken, commentsController.addComment);
router.get('/:commentId', checkToken, commentsController.getCommentsByAnime)

router.delete('/:commentId', checkToken, async (req, res) => {
  await Comment.findByIdAndDelete(req.params.commentId);
  res.send('Comment deleted');
});

module.exports = router;

