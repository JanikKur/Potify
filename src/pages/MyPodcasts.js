import React from 'react'
import PodcastItem from '../components/PodcastItem'
import '../assets/styles/pages/myPodcasts.css';
import { Link } from 'react-router-dom';

export default function MyPodcasts() {
  return (
    <main>
        <h2>My Podcasts</h2>
        <div className="podcast-list">
            <Link to='/addpodcast' className="add-podcast">+</Link>
            <PodcastItem/>
            <PodcastItem/>
            <PodcastItem/>
        </div>
    </main>
  )
}
