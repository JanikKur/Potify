import React from 'react'
import SearchBar from '../components/SearchBar';
import '../assets/styles/pages/home.css';
import { BiMicrophone, BiHeart, BiTrendingUp } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import MainLink from '../components/MainLink';
import Slider from '../layouts/Slider';

export default function Home() {
  return (
    <main>
      <SearchBar />
      <div className="main-links-wrapper">
        <MainLink icon={<BiMicrophone />} text="My Podcasts" href="/mypodcasts" />
        <MainLink icon={<BiHeart />} text="Favorites" href="/" />
        <MainLink icon={<BiTrendingUp />} text="Trends" href="/" />
        <MainLink icon={<FiSettings />} text="Settings" href="/settings" />
      </div>
      <div>
        <p>Beliebte Podcasts</p>
        <Slider/>
      </div>
    </main>
  )
}
