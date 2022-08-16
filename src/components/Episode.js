import React from 'react'
import '../assets/styles/components/episode.css';
import {BiEditAlt} from 'react-icons/bi';

export default function Episode({ onClick, setShowEpisodeSettings, setCurrentEditEpisode, episode, currentEpisode, episodeLink, image, title }) {

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
          <button className="edit-button" onClick={() => {setCurrentEditEpisode(episode); setShowEpisodeSettings(true)}}><BiEditAlt/></button>
        </div>
      </div>
    </div>
  )
}