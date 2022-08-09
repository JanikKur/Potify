import React from 'react'
import '../assets/styles/pages/podcast.css';
import TestImage from '../assets/images/index.png';
import {BiHeart,BiAddToQueue} from 'react-icons/bi';
import {RiDeleteBin6Line} from 'react-icons/ri';
import Episode from '../components/Episode';
import PodcastControls from '../components/PodcastControls';

export default function Podcast() {
    return (
        <>
        <main className="podcast">
            <div className="podcast-informations">
                <img alt="Teest" src={TestImage} />
                <h2>Der Podcast</h2>
                <h4>Mit Monte und Unge</h4>
                <div className="podcast-controls">
                    <button className="icon-button"><BiHeart/></button>
                    <button className="icon-button"><BiAddToQueue/></button>
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
        <PodcastControls/>
        </>
    )
}
