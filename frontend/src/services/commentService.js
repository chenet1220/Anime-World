import sendRequest from "./sendRequest";

const BASE_URL = "/api/comments";

export async function getComments(animeId) {
  try {
    const comments = await sendRequest(`${BASE_URL}/anime/${animeId}`);
    return comments;
  } catch (error) {
    throw error;
  }
}

export async function postComment(commentData) {
  try {
    const comment = await sendRequest(BASE_URL, "POST", commentData);
    return comment;
  } catch (error) {
    throw error;
  }
}

export async function deleteComment(commentId) {
  try {
    await sendRequest(`${BASE_URL}/${commentId}`, "DELETE");
  } catch (error) {
    throw error;
  }
}

export async function updateComment(commentId, commentData) {
  try {
    const updatedComment = await sendRequest(
      `${BASE_URL}/${commentId}`,
      "PUT",
      commentData
    );
    return updatedComment;
  } catch (error) {
    throw error;
  }
}