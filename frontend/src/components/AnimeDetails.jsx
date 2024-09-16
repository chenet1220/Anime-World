import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AnimeDetails = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    
    useEffect(() => {
        axios.get(`http://localhost:5173/api/anime/${id}`)
        .then((response) => {
            setAnime(response.data);
        });
    }, [id]);
    
    return (
        <div>
        {anime && (
            <div>
            <h1>{anime.title}</h1>
            <p>{anime.description}</p>
            </div>
        )}
        </div>
    );
    }