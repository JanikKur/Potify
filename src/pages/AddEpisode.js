import React, { useEffect, useRef, useState } from 'react'
import { useUser } from '../contexts/UserContext';
import { addEpisode, getPodcastByAuthor } from '../services/podcast';

export default function AddEpisode() {


    const { currentUser } = useUser();
    const [podcasts, setPodcasts] = useState([]);
    const podcastRef = useRef();
    const titleRef = useRef();
    const fileRef = useRef();
    const [defaultPodcast, setDefaultPodcast] = useState();

    useEffect(() => {
        if(currentUser){
            setDefaultPodcast(new URLSearchParams(window.location.search).get('id'));
            getPodcastByAuthor(currentUser._id).then(res => {
                res.data.podcasts && setPodcasts(res.data.podcasts);
            });
        }
    },[currentUser]);


    function submit(e){
        e.preventDefault();
        addEpisode(podcastRef.current.value, titleRef.current.value, fileRef.current.files[0]);
    }

    if(!currentUser) return null;
    return (
        <main>
            <h2>Add Episode</h2>
            <form onSubmit={submit} className="add-podcast-form">
                <div className="form-group">
                    <label>Podcast</label>
                    <select ref={podcastRef} defaultValue={defaultPodcast} className="form-control selection">
                        {podcasts.map(podcast => <option selected={defaultPodcast === podcast._id} value={podcast._id}>{podcast.title}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label>Title</label>
                    <input type="text" ref={titleRef} placeholder="Title" className="form-control" />
                </div>

                <div className="form-group">
                    <label>File</label>
                    <input ref={fileRef} type="file" />
                </div>
                <button className="main-button" type="submit">Add Episode</button>
            </form>
        </main>
    )
}
