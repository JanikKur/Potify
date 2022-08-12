import React, { useEffect, useState } from 'react'
import '../assets/styles/layouts/sliderSelection.css';
import PodcastSlider from '../components/PodcastSlider';
import { getPodcastByIds } from '../services/podcast';
import {useUser} from '../contexts/UserContext';
import { Link } from 'react-router-dom';

export default function SubscribedPodcastSlider() {


    const [podcasts, setPodcasts] = useState([]);
    const {currentUser} = useUser();

    useEffect(() => {
        if(currentUser){
            getPodcastByIds(currentUser.subscriptions).then(res => {
                setPodcasts(res.data.podcasts);
            });
        }
    }, [currentUser]);

    if(!currentUser) return null;
    return (
        <div className="slider-section">
            <div className='informations'>
                <p>Subscribed Podcasts</p>
                <Link to='/favorites' className='all-link'>view all</Link>
            </div>
            <PodcastSlider podcasts={podcasts}/>
        </div>
    )
}
