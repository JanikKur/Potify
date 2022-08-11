import React, { useEffect, useState } from 'react'
import PodcastItem from '../components/PodcastItem'
import '../assets/styles/pages/myPodcasts.css';
import { Link } from 'react-router-dom';
import {useUser} from '../contexts/UserContext';
import {getPodcastByAuthor} from '../services/podcast';

export default function MyPodcasts() {

  const {currentUser} = useUser();
  const [podcasts, setPodcasts] = useState();

  useEffect(() => {
    if(currentUser){
      console.log(currentUser);
      getPodcastByAuthor(currentUser._id).then(res => {
        setPodcasts(res.data.podcasts)
      })
    }
  },[currentUser]);

  if(!currentUser || !podcasts) return null;
  return (
    <main>
        <h2>My Podcasts</h2>
        <div className="podcast-list">
            <Link to='/addpodcast' className="add-podcast">+</Link>
            {podcasts.map(podcast => <PodcastItem key={podcast._id} data={podcast}/>)}
        </div>
    </main>
  )
}
