import sendRequest from "./sendRequest";

const BASE_URL = "/api/userLikes";

export async function getuserLikes(animeId) {
  try {
    const userLikes = await sendRequest(`${BASE_URL}/${animeId}/likes`, "GET");
    return userLikes;
  } catch (error) {
    throw error;
  }
}

export async function postuserLikes(userLikesData) {
  try {
    const userLikes = await sendRequest(`${BASE_URL}/like`, "POST", userLikesData);
    return userLikes;
  } catch (error) {
    throw error;
  }
}

export async function deleteuserLikes(userLikesId) {
  try {
    await sendRequest(`${BASE_URL}/${userLikesId}`, "DELETE");
  } catch (error) {
    throw error;
  }
}