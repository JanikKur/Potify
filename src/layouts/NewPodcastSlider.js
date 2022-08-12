import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
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
            <div className='informations'>
                <p>New Podcasts</p>
                <Link to='/search' className='all-link'>view all</Link>
            </div>
            <PodcastSlider podcasts={podcasts}/>
        </div>
    )
}
