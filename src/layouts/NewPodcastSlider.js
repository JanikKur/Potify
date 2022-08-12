import React, { useEffect, useState } from 'react'
import '../assets/styles/layouts/sliderSelection.css';
import PodcastSlider from '../components/PodcastSlider';
import { getAllPodcasts } from '../services/podcast';

export default function NewPodcastSlider() {


    const [podcasts, setPodcasts] = useState([]);

    useEffect(() => {
        getAllPodcasts().then(res => {
            setPodcasts(res.data.podcasts);
        });
    }, []);

    return (
        <div className="slider-section">
            <p>New Podcasts</p>
            <PodcastSlider podcasts={podcasts}/>
        </div>
    )
}
