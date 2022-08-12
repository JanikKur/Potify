import React, { useEffect, useState } from 'react'
import PodcastItem from '../components/PodcastItem';
import { getTrendingPodcasts } from '../services/podcast';

export default function Trends() {

    const [podcasts, setPodcasts] = useState([]);

    useEffect(() => {
        getTrendingPodcasts().then(res => {
            setPodcasts(res.data.podcasts);
        })
    }, []);


    return (
        <main>
            <h2>Trends</h2>
            <div className="podcast-list">
                {podcasts.map(podcast => <PodcastItem key={podcast._id} data={podcast} />)}
            </div>
        </main>
    )
}
