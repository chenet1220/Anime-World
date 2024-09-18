import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AnimeGalleryPage = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    axios.get('/api/anime')
      .then(response => setAnimeList(response.data.data))
      .catch(error => console.error(error));
  }, []);
console.log(animeList)
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