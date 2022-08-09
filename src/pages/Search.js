import React from 'react'
import SearchBar from '../components/SearchBar'
import '../assets/styles/pages/search.css';
import PodcastItem from '../components/PodcastItem';

export default function Search() {
  return (
    <main className="search">
        <h2>Search for Podcasts</h2>
        <SearchBar/>
        <h3>Results for "Der Podcast":</h3>
        <div className="search-results">
            <PodcastItem/>
        </div>
    </main>
  )
}
