import React from 'react'
import '../assets/styles/components/episode.css';

export default function Episode({ onClick, currentEpisode, episodeLink, image, title }) {

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
        </div>
      </div>
    </div>
  )
}