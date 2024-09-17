import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AnimeDetails = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [likes, setLikes] = useState(0); //keeps track of the number of likes for the anime
    const [userLikes, setUserLikes] = useState(0); //keeps track of the number of likes the user has given to the anime
    
    useEffect(() => {
        axios.get(`http://localhost:5173/api/anime/${id}`)
        .then((response) => {
            setAnime(response.data);
            setLikes(response.data.likes); //code to set the number of likes for the anime ?????
        });
    }, [id]);

    // Function to handle like button click
    const handleLike = () => {
        axios.post('http://localhost:5173/api/anime/${id}/userLikes')
        .then((response) => {
            setLikes(response.data.likes); // update the likes after the response 
            setUserLikes(response.data.userLikes); // set that the user has liked the anime
        })
        .catch((error) => {
            console.error(error);
        });
    };
    
    // return (
    //     <div>
    //     {anime && (
    //         <div>
    //         <h1>{anime.title}</h1>
    //         <p>{anime.description}</p>
    //         </div>
    //     )}
    //     </div>
    // );
    // }

    return (
        <div>
        {anime && (
            <div>
                <h1>{anime.title}</h1>
                <p>{anime.description}</p>
                
                {/* Display the number of likes */}
                <div>
                    <p>{likes} Likes</p>
                    <button onClick={handleLike} disabled={userHasLiked}>
                        {userHasLiked ? 'Liked' : 'Like'}
                    </button>
                </div>
            </div>
        )}
        </div>
    );
};

export default AnimeDetails;