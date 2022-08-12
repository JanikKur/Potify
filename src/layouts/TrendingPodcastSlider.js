import React, { useEffect, useState } from 'react'
import '../assets/styles/layouts/sliderSelection.css';
import PodcastSlider from '../components/PodcastSlider';
import { getTrendingPodcasts } from '../services/podcast';

export default function TrendingPodcastSlider() {


    const [podcasts, setPodcasts] = useState([]);

    useEffect(() => {
        getTrendingPodcasts().then(res => {
            setPodcasts(res.data.podcasts);
        });
    }, []);

    return (
        <div className="slider-section">
            <p>Trending Podcasts</p>
            <PodcastSlider podcasts={podcasts}/>
        </div>
    )
}
