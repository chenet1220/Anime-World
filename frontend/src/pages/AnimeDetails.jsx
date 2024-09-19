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

  useEffect(() => {
    animeService
      .getAnimeDetails(animeId)
      .then((anime) => setAnime(anime))
      .catch((error) => console.error(error))

    commentService
      .getComments(animeId)
      .then((comments) => setComments(comments))
      .catch((error) => console.error(error))
  }, [animeId])


  const handlelike = async () => {
    const animeLikes = await likesService.postuserLikes ({anime:anime.title})
  }
  
return (
    <div>
      {anime && (
        <>
          <h1>{anime.title}</h1>
          <img src={anime.images.jpg.image_url} alt={anime.title} />
          <button onClick={handlelike}>Like</button>
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