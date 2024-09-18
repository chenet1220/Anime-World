const express = require('express')
const axios = require('axios')
const router = express.Router()
const ensureLoggedIn = require('../middleware/ensureLoggedIn')
const {
  getAnimeDetails,
  searchAnime,
  getAllAnime
} = require('../controllers/anime')

router.get('/', getAllAnime)
router.get('/:animeId', getAnimeDetails)
router.get('/search',  searchAnime)

module.exports = router

