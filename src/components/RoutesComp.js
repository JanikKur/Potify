import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddEpisode from '../pages/AddEpisode'
import AddPodcast from '../pages/AddPodcast'
import Favorites from '../pages/Favorites'
import Home from '../pages/Home'
import Login from '../pages/Login'
import MyPodcasts from '../pages/MyPodcasts'
import NotFound from '../pages/NotFound'
import Podcast from '../pages/Podcast'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Settings from '../pages/Settings'
import { useUser } from '../contexts/UserContext'

export default function RoutesComp() {

  const {currentUser} = useUser();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/podcast" element={<Podcast />} />
      {currentUser && <Route path="/settings" element={<Settings />} />}
      {currentUser && <Route path="/mypodcasts" element={<MyPodcasts />} />}
      {currentUser && <Route path="/addpodcast" element={<AddPodcast />} />}
      {currentUser && <Route path="/addepisode" element={<AddEpisode />} />}
      {currentUser && <Route path="/favorites" element={<Favorites />} />}
      {!currentUser && <Route path="/login" element={<Login />} />}
      {!currentUser && <Route path="/register" element={<Register />} />}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
