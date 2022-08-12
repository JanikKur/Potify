import React, { useEffect, useState } from 'react'
import PodcastItem from '../components/PodcastItem';
import { useUser } from '../contexts/UserContext';
import { getPodcastByIds } from '../services/podcast';

export default function Favorites() {

    const { currentUser } = useUser();
    const [podcasts, setPodcasts] = useState([]);

    useEffect(() => {
        if(currentUser){
            getPodcastByIds(currentUser.subscriptions).then(res => {
                setPodcasts(res.data.podcasts);
            });
        }
    }, [currentUser]);

    if(!currentUser) return null;
    return (
        <main className="search">
            <h2>Favorites</h2>
            <div className="podcast-list">
                {podcasts.length ? podcasts.map(podcast => <PodcastItem key={podcast._id} data={podcast} />) : 'No Podcasts Found'}
            </div>
        </main>
    )
}
