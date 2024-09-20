const express = require('express')
const router = express.Router()
const {
  getAnimeDetails,
  searchAnime,
  getAllAnime
} = require('../controllers/anime')

router.get('/', getAllAnime)
router.get('/:animeId', getAnimeDetails)
router.get('/search',  searchAnime)

module.exports = router
