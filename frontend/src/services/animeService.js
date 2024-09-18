import sendRequest from './sendRequest'

const BASE_URL = '/api/anime'

export async function getAnimeDetails(animeId) {
  try {
    const anime = await sendRequest(`${BASE_URL}/${animeId}`)
    console.log(anime.data)
    return anime.data
  } catch (error) {
    throw error
  }
}

export async function searchAnime(query) {
  try {
    const results = await sendRequest(`${BASE_URL}/search?q=${query}`)
    return results
  } catch (error) {
    throw error
  }
}

export async function getAllAnime() {
  try {
    const anime = await sendRequest(BASE_URL)
    console.log(anime)
    return anime
  } catch (error) {
    throw error
  }
}