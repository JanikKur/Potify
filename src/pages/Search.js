import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import '../assets/styles/pages/search.css';
import PodcastList from '../layouts/PodcastList';
import Loading from '../components/Loading';
import { getAllPodcasts, getPodcastByTitle } from '../services/podcast';

export default function Search() {

  const [title, setTitle] = useState(null);
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search).get('q');
    setTitle(search ? search : '');
  }, []);

  useEffect(() => {
    if(title === null){
      return;
    }
    if (title) {
      getPodcastByTitle(title).then(res => {
        setPodcasts(res.data.podcasts);
        setIsLoading(false);
      });
    } else {
      getAllPodcasts().then(res => {
        setPodcasts(res.data.podcasts);
        setIsLoading(false);
      });
    }
  }, [title]);

  return (
    <main className="search">
      <h2>Search for Podcasts</h2>
      <SearchBar title={title} onSubmit={setTitle} />
      {title && <h3>Results for "{title}":</h3>}
      {isLoading ? <Loading/> : <PodcastList podcasts={podcasts} />}
    </main>
  )
}
