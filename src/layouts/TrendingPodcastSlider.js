import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../assets/styles/layouts/sliderSelection.css';
import Loading from '../components/Loading';
import PodcastSlider from '../components/PodcastSlider';
import { getTrendingPodcasts } from '../services/podcast';

export default function TrendingPodcastSlider() {


    const [podcasts, setPodcasts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTrendingPodcasts(5).then(res => {
            setPodcasts(res.data.podcasts);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="slider-section">
            <div className='informations'>
                <p>Trending Podcasts</p>
                <Link to='/trends' className='all-link'>view all</Link>
            </div>
            {isLoading ? <Loading/> : <PodcastSlider podcasts={podcasts}/>}
        </div>
    )
}
