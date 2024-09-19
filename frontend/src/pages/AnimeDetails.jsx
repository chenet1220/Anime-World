import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CommentSection from '../components/Comments' // Import comment section
import * as animeService from '../services/animeService'
import * as commentService from '../services/commentService'
import * as likesService from '../services/likesService'

const AnimeDetails = ({ username, userId }) => {
  const { animeId } = useParams()
  const [anime, setAnime] = useState(null)
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState(null)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const anime = await animeService.getAnimeDetails(animeId);
        setAnime(anime);

        const comments = await commentService.getComments(animeId);
        setComments(comments);

        const likes = await likesService.getuserLikes(animeId);
        setLikes(likes.likes);
        setIsLiked(likes.likes.some((like) => like.userId.toString() === userId));
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, [animeId, userId, isLiked]);

  const handlelike = async () => {
    const animeLikes = await likesService.postuserLikes({ anime: animeId })
    setIsLiked(!isLiked)
  }

  return (
    <div>
      {anime && (
        <>
          <h1>{anime.title}</h1>
          <img src={anime.images.jpg.image_url} alt={anime.title} />
          <button onClick={handlelike}>{isLiked ? 'Unlike' : 'Like'}</button>
          <p>{anime.synopsis}</p>
        </>
      )}
      <CommentSection
        animeId={animeId}
        userId={userId}
        username={username}
        comments={comments}
        setComments={setComments}
      />
    </div>
  )
}

export default AnimeDetails