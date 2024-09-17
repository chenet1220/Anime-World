const UserLikes = require('../models/userLikes');

// like an anime 
exports.likeAnime = async (req, res) => {
    try {
        const { anime } = req.body;
        const userId = req.user._id;
        const alreadyLiked = await UserLikes.findOne({ userId, anime: anime });
        if (alreadyLiked) {
            return res.status(400).json({ message: 'You have already liked this anime' });
        }

        // create a new like
        const newLike = new UserLikes({ userId, anime });

        await newLike.save();
        res.status(201).json({ message: 'Anime liked successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
      
       // get total likes for an anime
       exports.getAnimeLikes = async (req, res) => {
        try {
            const { anime } = req.params;
            const likes = await UserLikes.find({ anime: anime });
            res.status(200).json({ likes: likes.length });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
        