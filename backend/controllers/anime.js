const axios = require('axios');
const anime = require('../models/anime');
const BASE_URL = 'https://api.jikan.moe/v4';

// Function to fetch anime details by ID
async function getAnimeDetails(animeId) {
    try {
        const response = await axios.get(`${BASE_URL}/anime/${animeId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching anime details:', error);
        throw error;
    }
}

// Function to search for anime by keyword
async function searchAnime(keyword) {
    try {
        const response = await axios.get(`${BASE_URL}/search/anime?q=${keyword}`);
        return response.data.results;
    } catch (error) {
        console.error('Error searching anime:', error);
        throw error;
    }
}

//SHOW GAME FROM RAWG
// async function Show(req, res) {
//     try {
//       const Anime = await fetch(`${baseURL}/anime/${req.params.id}?key=${API_KEY}`);
//       const animeJson = await Anime.json();
//       const dbanime = await Anime.findOne({ rawgId: req.params.id }).populate('reviews.user');
//       if (dbAnime) {
//         return res.status(200).json({
//           Data: animeJson,
//           reviews: dbAnime.reviews 
//         });
//       } else {
//         return res.status(200).json({ Data: animeJson });
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   };
  
//   async function showLikedAnime(req, res) {
//     try {
//       const user = await User.findById(req.user._id).populate('likes');
//       if (!user || !user.likes.length) {
//         return res.status(404).json({ message: 'No liked anime found.' });
//       }
//       res.status(200).json(user.likes);
//     } catch (err) {
//       res.status(500).json({ error: 'Server error', details: err });
//     }
//   }


// Export the functions to be used in other modules
module.exports = {
    getAnimeDetails,
    searchAnime,
};