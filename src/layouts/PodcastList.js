import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import PodcastItem from '../components/PodcastItem';
import { getAllPodcasts, getPodcastByTitle } from '../services/podcast';


export default function PodcastList({title}) {

    const [podcasts, setPodcasts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(title){
            getPodcastByTitle(title).then(res => {
                setPodcasts(res.data.podcasts);
                setIsLoading(false);
            });
        }else{
            getAllPodcasts().then(res => {
                setPodcasts(res.data.podcasts);
                setIsLoading(false);
            });
        }
    }, [title]);

    if(isLoading) return <Loading/>
    return (
        <div className="podcast-list">
            {podcasts.length ? podcasts.map(podcast => <PodcastItem key={podcast._id} data={podcast} />) : 'No Podcasts Found'}
        </div>
    )
}
