import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentSection from './Comments'; // Import comment section


const AnimeDetails = () => {
  const { animeId } = useParams();
  const [anime, setAnime] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`https://api.jikan.moe/v4/anime/${animeId}`)
      .then(response => setAnime(response.data.data))
      .catch(error => console.error(error));

    axios.get(`/api/comments/${animeId}`)
      .then(response => setComments(response.data))
      .catch(error => console.error(error));
  }, [animeId]);

  return (
    <div>
      {anime && (
        <>
          <h1>{anime.title}</h1>
          <img src={anime.images.jpg.image_url} alt={anime.title} />
          <p>{anime.synopsis}</p>
        </>
      )}
      <CommentSection comments={comments} />
    </div>
  );
};

export default AnimeDetails;
