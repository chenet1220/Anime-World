const axios = require('axios')
const BASE_URL = 'https://api.jikan.moe/v4'

// Function to fetch anime details by ID
async function getAllAnime(req, res) {
  try {
    const response = await axios.get(`${BASE_URL}/anime`)   
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching all anime:', error)
    throw error
  }
}

async function getAnimeDetails(req, res) {
  try {
    const response = await axios.get(`${BASE_URL}/anime/${req.params.animeId}`)
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching anime details:', error)
    throw error
  }
}

// Function to search for anime by keyword
async function searchAnime(req, res) {
  try {
    const response = await axios.get(`${BASE_URL}/search/anime?q=${req.query}`)
    res.status(200).json(response.data.results);
  } catch (error) {
    console.error('Error searching anime:', error)
    throw error
  }
}

// Export the functions to be used in other modules
module.exports = {
  getAnimeDetails,
  searchAnime,
  getAllAnime
}