import React, { useEffect, useState } from 'react'
import { useUser } from '../contexts/UserContext';
import { getPodcastByIds } from '../services/podcast';
import PodcastList from '../layouts/PodcastList';
import Loading from '../components/Loading';

export default function Favorites() {

    const { currentUser } = useUser();
    const [podcasts, setPodcasts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if(currentUser){
            getPodcastByIds(currentUser.subscriptions).then(res => {
                setPodcasts(res.data.podcasts);
                setIsLoading(false);
            }).catch(err => {});
        }
    }, [currentUser]);

    if(!currentUser) return null;
    return (
        <main className="search">
            <h2>Favorites</h2>
            {isLoading ? <Loading/> : <PodcastList podcasts={podcasts} />}
        </main>
    )
}
