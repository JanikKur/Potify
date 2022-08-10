import React, { useEffect, useState } from 'react'
import PodcastItem from '../components/PodcastItem';
import { getAllPodcasts, getPodcastByTitle } from '../services/podcast';


export default function PodcastList({title}) {

    const [podcasts, setPodcasts] = useState();

    useEffect(() => {
        if(title){
            getPodcastByTitle(title).then(res => {
                setPodcasts(res.data.podcasts);
            });
        }else{
            getAllPodcasts().then(res => {
                setPodcasts(res.data.podcasts);
            });
        }
    }, [title]);

    if(!podcasts) return null;
    return (
        <div className="podcast-list">
            {podcasts.length ? podcasts.map(podcast => <PodcastItem key={podcast._id} data={podcast} />) : 'No Podcasts Found'}
        </div>
    )
}
