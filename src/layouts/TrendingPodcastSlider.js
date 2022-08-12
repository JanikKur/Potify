import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
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
            <div className='informations'>
                <p>Trending Podcasts</p>
                <Link to='/trends' className='all-link'>view all</Link>
            </div>
            <PodcastSlider podcasts={podcasts}/>
        </div>
    )
}
