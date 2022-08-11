import React, { useEffect, useState } from 'react'
import '../assets/styles/pages/podcast.css';
import {BiHeart,BiAddToQueue} from 'react-icons/bi';
import {BsFillHeartFill} from 'react-icons/bs';
import {RiDeleteBin6Line} from 'react-icons/ri';
import Episode from '../components/Episode';
import PodcastControls from '../components/PodcastControls';
import { Link } from 'react-router-dom';
import { getPodcastById } from '../services/podcast';
import {useUser} from '../contexts/UserContext';
import {useEpisode} from '../contexts/EpisodeContext';

export default function Podcast() {

    const [podcast, setPodcast] = useState(null);

    const {currentEpisode, updateEpisode, currentTitle, setCurrentTitle} = useEpisode();
    const {currentUser, toggleSubscription, isSubscribed} = useUser();

    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get('id');
        getPodcastById(id !== "undefined" ? id : '62f38940662a95ffecfa96e7').then(res => { //TODO
            setPodcast(res.data.podcast);
        })
    },[]);


    if(!podcast || !currentEpisode) return null;
    return (
        <>
        <main className="podcast">
            <div className="podcast-informations">
                <img alt="Teest" src={`${process.env.REACT_APP_BACKEND_URL}${podcast.fileLinks[0]}`} />
                <h2>{podcast.title}</h2>
                <h4>{podcast.description}</h4>
                <div className="podcast-controls">
                    {currentUser && <button className="icon-button" onClick={() => toggleSubscription(podcast._id)}>{isSubscribed(podcast._id) ? <BsFillHeartFill className="subscribed"/> : <BiHeart/>}</button>}
                    <Link to={`/addepisode?id=${podcast._id}`} className="icon-link"><BiAddToQueue/></Link>
                    <button className="icon-button"><RiDeleteBin6Line/></button>
                </div>
            </div>
            <div className="episodes-list">
                <h4>Alle Episoden:</h4>
                {!podcast.episodes.length ? 'No Episodes yet' : podcast.episodes.map((episode, idx) => <Episode key={idx} onClick={link => {updateEpisode(link); setCurrentTitle(episode.title)}} currentEpisode={currentEpisode} episodeLink={`${process.env.REACT_APP_BACKEND_URL}/api/v1/podcast/play/${episode.fileLinks[0]}`} image={`${process.env.REACT_APP_BACKEND_URL}${podcast.fileLinks[0]}`} title={episode.title} />)}
            </div>
        </main>
        </>
    )
}
