// import { useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { getUser } from '../../services/authService';
// import './App.css';
// import NavBar from '../../components/NavBar/NavBar';
// import HomePage from '../HomePage/HomePage';
// import AnimeGalleryPage from '../AnimeGalleryPage/AnimeGalleryPage'; // Corrected import path
// import SignUpPage from '../SignUpPage/SignUpPage';
// import LogInPage from '../LogInPage/LogInPage';

// function App() {
//   const [user, setUser] = useState(getUser());

//   return (
//     <main id="react-app">
//       <NavBar user={user} setUser={setUser} />
//       <section id="main-section">
//         {user ? (
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/posts" element={<PostListPage />} />
//             <Route path="/anime-gallery" element={<AnimeGalleryPage />} />
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         ) : (
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/login" element={<LogInPage setUser={setUser} />} />
//             <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         )}
//       </section>
//     </main>
//   );
// }

// export default App;


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AnimeGalleryPage from '../AnimeGalleryPage';
import AnimeDetails from '../AnimeDetails';
import LoginPage from '../LogInPage/LogInPage';
import SignUpPage from '../SignUpPage/SignUpPage';

function App() {
  return (
    <Routes>
  
        <Route path="/" element={AnimeGalleryPage} />
        <Route path="/anime/:animeId" element={AnimeDetails} />
        <Route path="/login" element={LoginPage} />
        <Route path="/signup" element={SignUpPage} />
  
    </Routes>
  );
}

export default App;

