import React, { useRef, useState } from 'react'
import '../assets/styles/components/episodeSettings.css';
import { updateEpisode } from '../services/podcast';
import Loading from './Loading';

export default function EpisodeSettings({setShowEpisodeSettings, setPodcast, episode}) {

    const [isLoading, setIsLoading] = useState(false);
    const titleRef = useRef();

    async function submit(e){
        e.preventDefault();
        setIsLoading(true);
        await updateEpisode(episode.fileLinks[0], {
            title: titleRef.current.value
        });
        setPodcast(prev => {
            const episodes = prev.episodes.filter(episodePodcast => episodePodcast.fileLinks[0] !== episode.fileLinks[0]);
            episodes.push({
                ...episode,
                title: titleRef.current.value
            });
            return {...prev, episodes: episodes}
        })
        setIsLoading(false);
        setShowEpisodeSettings(false);
    }

    if(!episode) return null;
    return (
        <aside className="episode-settings-wrapper">
            <form onSubmit={submit} className="episode-settings">
                <h3>Episode Settings</h3>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" placeholder="Title" ref={titleRef} defaultValue={episode.title} className="form-control" required />
                </div>
                <div className="control-buttons">
                    <button disabled={isLoading} className="main-button">{isLoading ? <Loading/> : 'Save'}</button>
                    <button disabled={isLoading} onClick={() => setShowEpisodeSettings(false)} className="cancel-button">Cancel</button>
                </div>
            </form>
        </aside>
    )
}
