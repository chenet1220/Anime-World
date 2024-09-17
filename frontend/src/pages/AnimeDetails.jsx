import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AnimeDetails = () => {
  const { animeId } = useParams();
  const [anime, setAnime] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`https://api.jikan.moe/v4/anime/${animeId}`)
      .then(response => setAnime(response.data.data))
      .catch(error => console.error(error));

    axios.get(`http://localhost:5173/api/comments/${animeId}`)
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
      <div>
        {comments.map(comment => (
          <div key={comment._id}>
            <p>{comment.text} - Rating: {comment.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeDetails;
