const UserLikes = require('../models/userLikes')

// like an anime
exports.likeAnime = async (req, res) => {
  try {
    const { anime } = req.body
    const userId = req.user._id
    const existingLike = await UserLikes.findOne({ userId, anime })

    if (existingLike) {
      // If the like already exists, remove it (unlike)
      await UserLikes.deleteOne({ _id: existingLike._id })
      return res.status(200).json({ message: 'Anime unliked successfully' })
    } else {
      // If the like does not exist, create a new like
      const newLike = new UserLikes({ userId, anime })
      await newLike.save()
      return res.status(201).json({ message: 'Anime liked successfully' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// get total likes for an anime
exports.getAnimeLikes = async (req, res) => {
  try {
    const { anime } = req.params
    const likes = await UserLikes.find({ anime: anime })
    res.status(200).json({ likes: likes })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}