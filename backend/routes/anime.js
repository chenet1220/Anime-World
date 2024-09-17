// const express = require('express');

// const router = express.Router();

// // Example data
// const animeList = [
//     { id: 1, title: 'Naruto' },
//     { id: 2, title: 'One Piece' },
//     { id: 3, title: 'Attack on Titan' }
// ];

// // GET all anime
// router.get('/', (req, res) => {
//     res.json(animeList);
// });

// // GET a specific anime by ID
// router.get('/:id', (req, res) => {
//     const animeId = parseInt(req.params.id);
//     const anime = animeList.find(anime => anime.id === animeId);
//     if (anime) {
//         res.json(anime);
//     } else {
//         res.status(404).json({ message: 'Anime not found' });
//     }
// });

// // POST a new anime
// router.post('/', (req, res) => {
//     const { title } = req.body;
//     const newAnime = { id: animeList.length + 1, title };
//     animeList.push(newAnime);
//     res.status(201).json(newAnime);
// });

// // PUT/update an existing anime
// router.put('/:id', (req, res) => {
//     const animeId = parseInt(req.params.id);
//     const { title } = req.body;
//     const anime = animeList.find(anime => anime.id === animeId);
//     if (anime) {
//         anime.title = title;
//         res.json(anime);
//     } else {
//         res.status(404).json({ message: 'Anime not found' });
//     }
// });

// // DELETE an anime by ID
// router.delete('/:id', (req, res) => {
//     const animeId = parseInt(req.params.id);
//     const index = animeList.findIndex(anime => anime.id === animeId);
//     if (index !== -1) {
//         animeList.splice(index, 1);
//         res.json({ message: 'Anime deleted' });
//     } else {
//         res.status(404).json({ message: 'Anime not found' });
//     }
// });

// module.exports = router;



const express = require('express');
const axios = require('axios');
const checkToken = require('../middleware/checkToken');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { data } = await axios.get('https://api.jikan.moe/v4/anime');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching anime' });
  }
});

module.exports = router;

