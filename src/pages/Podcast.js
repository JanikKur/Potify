import React, { useEffect, useState } from 'react'
import '../assets/styles/pages/podcast.css';
import {BiHeart,BiAddToQueue} from 'react-icons/bi';
import {RiDeleteBin6Line} from 'react-icons/ri';
import Episode from '../components/Episode';
import PodcastControls from '../components/PodcastControls';
import { Link } from 'react-router-dom';
import { getPodcastById } from '../services/podcast';

export default function Podcast() {

    const [podcast, setPodcast] = useState(null);
    const [currentEpisode, setCurrentEpisode] = useState(new Audio());

    function updateEpisode(podcastLink) {
        currentEpisode.pause();
        setCurrentEpisode((prev) => { return new Audio(podcastLink) })
    }

    useEffect(() => {
        getPodcastById('62f38940662a95ffecfa96e7').then(res => { 
            setPodcast(res.data.podcast);
        })
    },[]);

    if(!podcast) return null;
    return (
        <>
        <main className="podcast">
            <div className="podcast-informations">
                <img alt="Teest" src={`${process.env.REACT_APP_BACKEND_URL}${podcast.fileLinks[0]}`} />
                <h2>{podcast.title}</h2>
                <h4>{podcast.description}</h4>
                <div className="podcast-controls">
                    <button className="icon-button"><BiHeart/></button>
                    <Link to='/addepisode' className="icon-link"><BiAddToQueue/></Link>
                    <button className="icon-button"><RiDeleteBin6Line/></button>
                </div>
            </div>
            <div className="episodes-list">
                <h4>Alle Episoden:</h4>
                {!podcast.episodes.length ? 'No Episodes yet' : podcast.episodes.map((episode, idx) => <Episode key={idx} onClick={updateEpisode} currentEpisode={currentEpisode} episodeLink={`${process.env.REACT_APP_BACKEND_URL}/api/v1/podcast/play/${episode.fileLinks[0]}`} image={`${process.env.REACT_APP_BACKEND_URL}${podcast.fileLinks[0]}`} title={episode.title} />)}
            </div>
        </main>
        <PodcastControls episode={currentEpisode}/>
        </>
    )
}
