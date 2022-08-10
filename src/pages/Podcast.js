import React, { useEffect, useState } from 'react'
import '../assets/styles/pages/podcast.css';
import TestImage from '../assets/images/index.png';
import {BiHeart,BiAddToQueue} from 'react-icons/bi';
import {RiDeleteBin6Line} from 'react-icons/ri';
import Episode from '../components/Episode';
import PodcastControls from '../components/PodcastControls';
import { Link } from 'react-router-dom';

export default function Podcast() {

    //const [podcast, setPodcast] = useState(null);
    const [currentEpisode, setCurrentEpisode] = useState(new Audio('http://localhost:5000/api/v1/podcast/play/17e04694-0258-40e6-81b1-94bbcede0737.m4a'));

    function updateEpisode(podcastLink) {
        currentEpisode.pause();
        setCurrentEpisode((prev) => { return new Audio(podcastLink) })
    } 

    useEffect(() => {
        updateEpisode('http://192.168.2.100:5000/api/v1/podcast/play/17e04694-0258-40e6-81b1-94bbcede0737.m4a');
    },[]);

    return (
        <>
        <main className="podcast">
            <div className="podcast-informations">
                <img alt="Teest" src={TestImage} />
                <h2>Der Podcast</h2>
                <h4>Mit Monte und Unge</h4>
                <div className="podcast-controls">
                    <button className="icon-button"><BiHeart/></button>
                    <Link to='/addepisode' className="icon-link"><BiAddToQueue/></Link>
                    <button className="icon-button"><RiDeleteBin6Line/></button>
                </div>
            </div>
            <div className="episodes-list">
                <h4>Alle Episoden:</h4>
                <Episode image={TestImage} title="Von Fritz Meinecke und illegalen Straßenrennen" />
                <Episode image={TestImage} title="Von Fritz Meinecke und illegalen Straßenrennen" />
                <Episode image={TestImage} title="Von Fritz Meinecke und illegalen Straßenrennen" />
                <Episode image={TestImage} title="Von Fritz Meinecke und illegalen Straßenrennen" />
                <Episode image={TestImage} title="Von Fritz Meinecke und illegalen Straßenrennen" />
            </div>
        </main>
        <PodcastControls podcast={currentEpisode}/>
        </>
    )
}
