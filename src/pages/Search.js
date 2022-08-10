import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import '../assets/styles/pages/search.css';
import PodcastList from '../layouts/PodcastList';

export default function Search() {

  const [title, setTitle] = useState('');

  useEffect(() => {
    const search = new URLSearchParams(window.location.search).get('q');
    changeTitle(search);
  }, [])

  function changeTitle(title){
    setTitle(title);
  }

  return (
    <main className="search">
        <h2>Search for Podcasts</h2>
        <SearchBar title={title} onSubmit={changeTitle} />
        {title && <h3>Results for "{title}":</h3>}
        <PodcastList title={title}/>
    </main>
  )
}
