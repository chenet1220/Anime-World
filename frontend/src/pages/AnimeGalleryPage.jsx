import React, { useEffect, useState } from 'react';
import * as animeService from '../services/animeService';
import { Link } from 'react-router-dom';
import { set } from 'mongoose';

const AnimeGalleryPage = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await animeService.getAllAnime();
        setAnimeList(response.data);
      } catch (error) {
        setError(error);
        console.error(error);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Anime Gallery</h1>
      <div>
        {animeList.map(anime => (
          <div key={anime.mal_id}>
            <Link to={`/anime/${anime.mal_id}`}>
              <img src={anime.images.jpg.image_url} alt={anime.title} />
              <h3>{anime.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeGalleryPage;