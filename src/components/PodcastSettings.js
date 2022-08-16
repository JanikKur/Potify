import React, { useRef, useState } from 'react'
import { updatePodcast } from '../services/podcast';
import Loading from './Loading';

export default function PodcastSettings({setPodcast, setShowSettings, podcast}) {

    const [isLoading, setIsLoading] = useState(false);
    const titleRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();

    async function submit(e){
        e.preventDefault();
        setIsLoading(true);
        const newData = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            file: imageRef.current.files[0]
        }
        await updatePodcast(podcast._id, newData);
        setPodcast(prev => {
            return {
                ...prev,
                ...newData
            }
        })
        setIsLoading(false);
        setShowSettings(false);
    }

    return (
        <aside className="episode-settings-wrapper">
            <form onSubmit={e => !isLoading && submit(e)} className="episode-settings">
                <h3>Podcast Settings</h3>
                <div className="form-group">
                    <label>Title Image</label>
                    <input type="file" ref={imageRef} placeholder="Title"/>
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" ref={titleRef} defaultValue={podcast.title} placeholder="Title" className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" ref={descriptionRef} defaultValue={podcast.description} placeholder="Description" className="form-control" required />
                </div>
                <div className="control-buttons">
                    <button disabled={isLoading} className="main-button">{isLoading ? <Loading /> : 'Save'}</button>
                    <button disabled={isLoading} onClick={() => setShowSettings(false)} className="cancel-button">Cancel</button>
                </div>
            </form>
        </aside>
    )
}
