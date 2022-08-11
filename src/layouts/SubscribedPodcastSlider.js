import React, { useEffect, useState } from 'react'
import '../assets/styles/layouts/sliderSelection.css';
import PodcastSlider from '../components/PodcastSlider';
import { getAllPodcasts } from '../services/podcast';
import {useUser} from '../contexts/UserContext';

export default function SubscribedPodcastSlider() {


    const [podcasts, setPodcasts] = useState([]);
    const {currentUser} = useUser();

    useEffect(() => {
        getAllPodcasts().then(res => {
            setPodcasts(res.data.podcasts);
        });
    }, []);

    return (
        <div className="slider-section">
            <p>Subscribed Podcasts</p>
            <PodcastSlider podcasts={podcasts}/>
        </div>
    )
}
