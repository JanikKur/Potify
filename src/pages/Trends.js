import React, { useEffect, useState } from 'react'
import PodcastItem from '../components/PodcastItem';
import { getTrendingPodcasts } from '../services/podcast';

export default function Trends() {

    const [podcasts, setPodcasts] = useState([]);
    const [page, setPage] = useState(1);
    const [moreResults, setMoreResults] = useState(true);

    useEffect(() => {
        updatePodcasts(3,page);
    }, [page]);

    function updatePodcasts(limit, page) {
        getTrendingPodcasts(limit,page).then(res => {
            setPodcasts(prev => {
                if(!res.data.podcasts.length) setMoreResults(false);
                const newPodcasts = [...prev, ...res.data.podcasts.filter(podcast => !prev.some(element => element._id === podcast._id))];
                return newPodcasts
            });
        }).catch(err => {});
      }

    return (
        <main>
            <h2>Trends</h2>
            <div className="podcast-list">
                {podcasts.map(podcast => <PodcastItem key={podcast._id} data={podcast} />)}
            </div>
            {moreResults && <button onClick={() => setPage(page + 1)} className="main-button more-button">More</button>}
        </main>
    )
}
