import React, { useEffect, useState } from 'react'
import PodcastItem from '../components/PodcastItem'
import '../assets/styles/pages/myPodcasts.css';
import { Link } from 'react-router-dom';
import {useUser} from '../contexts/UserContext';
import {getPodcastByAuthor} from '../services/podcast';
import PodcastList from '../layouts/PodcastList';
import Loading from '../components/Loading';

export default function MyPodcasts() {

  const {currentUser} = useUser();
  const [podcasts, setPodcasts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(currentUser){
      getPodcastByAuthor(currentUser._id).then(res => {
        setPodcasts(res.data.podcasts);
        setIsLoading(false);
      })
    }
  },[currentUser]);

  if(!currentUser || !podcasts) return null;
  return (
    <main>
        <h2>My Podcasts</h2>
        <Link to='/addpodcast' className="add-podcast">+</Link>
        {isLoading ? <Loading/> : <PodcastList podcasts={podcasts}/>}
    </main>
  )
}
