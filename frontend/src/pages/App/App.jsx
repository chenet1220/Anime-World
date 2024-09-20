import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../services/authService'
import AnimeGalleryPage from '../AnimeGalleryPage'
import AnimeDetails from '../AnimeDetails'
import LoginPage from '../LogInPage/LogInPage'
import SignUpPage from '../SignUpPage/SignUpPage'
import NavBar from '../../components/NavBar/NavBar'
import HomePage from '../HomePage/HomePage'


function App() {
  const [user, setUser] = useState(getUser())

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime/gallery" element={<AnimeGalleryPage />} />
        <Route
          path="/anime/:animeId"
          element={<AnimeDetails username={user?.name} userId={user?._id} />}
        />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
      </Routes>
    </>
  )
}

export default App


