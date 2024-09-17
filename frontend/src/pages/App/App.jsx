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
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AnimeGalleryPage from './pages/AnimeGalleryPage';
import AnimeDetails from './components/AnimeDetails';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={AnimeGalleryPage} />
        <Route path="/anime/:animeId" component={AnimeDetails} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
      </Switch>
    </Router>
  );
}

export default App;

