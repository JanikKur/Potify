import React from 'react'
import '../assets/styles/components/episode.css';
import {BiEditAlt} from 'react-icons/bi';
import { useUser } from '../contexts/UserContext';

export default function Episode({ onClick, setShowEpisodeSettings, podcastAuthor, setCurrentEditEpisode, episode, currentEpisode, episodeLink, image, title }) {

  const {currentUser} = useUser();

  function isCurrentPodcast() {
    return currentEpisode.src === episodeLink;
  }

  return (
    <div className="episode">
      <img src={image} alt="TEst" />
      <div className="episode-informations">
        <label>{title}</label>
        <div className="episode-controls">
          <button disabled={isCurrentPodcast()} className="play-button" onClick={() => onClick(episodeLink)}>{isCurrentPodcast() ? 'Playing...' : 'Play'}</button>
          <label>35min</label>
          {currentUser && currentUser._id === podcastAuthor && <button className="edit-button" onClick={() => {setCurrentEditEpisode(episode); setShowEpisodeSettings(true)}}><BiEditAlt/></button>}
        </div>
      </div>
    </div>
  )
}