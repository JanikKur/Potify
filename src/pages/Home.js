import React from 'react'
import SearchBar from '../components/SearchBar';
import '../assets/styles/pages/home.css';
import { BiMicrophone, BiHeart, BiTrendingUp } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import MainLink from '../components/MainLink';
import Slider from '../layouts/Slider';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  let navigate = useNavigate();
  let submit = title => {
    navigate(`/search?q=${title}`);
  }

  return (
    <main>
      <SearchBar onSubmit={submit} />
      <div className="main-links-wrapper">
        <MainLink icon={<BiMicrophone />} text="My Podcasts" href="/mypodcasts" />
        <MainLink icon={<BiHeart />} text="Favorites" href="/" />
        <MainLink icon={<BiTrendingUp />} text="Trends" href="/" />
        <MainLink icon={<FiSettings />} text="Settings" href="/settings" />
      </div>
      <div>
        <p>Beliebte Podcasts</p>
        <Slider />
      </div>
    </main>
  )
}
