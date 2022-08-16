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
  const [page, setPage] = useState(1);
  const [moreResults, setMoreResults] = useState(true);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search).get('q');
    setTitle(search ? search : '');
  }, []);

  useEffect(() => {
    if (title === null) {
      return;
    }
    updatePodcasts(title, 4, page);
  }, [title, page]);


  function updatePodcasts(title, limit, page) {
    if (title) {
      getPodcastByTitle(title, limit, page).then(res => {
        if(!res.data.podcasts.length) setMoreResults(false);
        setPodcasts(prev => [...prev, ...res.data.podcasts]);
        setIsLoading(false);
      }).catch(err => { });
    } else {
      getAllPodcasts(limit, page).then(res => {
        if(!res.data.podcasts.length) setMoreResults(false);
        setPodcasts(prev => [...prev, ...res.data.podcasts.filter(podcast => !prev.some(element => element._id === podcast._id))]);
        setIsLoading(false);
      }).catch(err => { });
    }
  }

  return (
    <main className="search">
      <h2>Search for Podcasts</h2>
      <SearchBar title={title} onSubmit={setTitle} />
      {title && <h3>Results for "{title}":</h3>}
      {isLoading ? <Loading /> : <PodcastList podcasts={podcasts} />}
      {moreResults && <button onClick={() => setPage(page + 1)} className="main-button more-button">More</button>}
    </main>
  )
}
