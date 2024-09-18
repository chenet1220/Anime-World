
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  animeId: {
    type: String, // anime's API ID or a reference
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment

// const mongoose = require('mongoose');

// const commentSchema = new mongoose.Schema({
//   animeId: { type: String, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   text: String,
//   rating: { type: Number, min: 1, max: 5 },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// const Comment = mongoose.model('Comment', commentSchema);
// module.exports = Comment;