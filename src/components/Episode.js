import React from 'react'
import '../assets/styles/components/episode.css';

export default function Episode({image, title}) {
  return (
    <div className="episode">
        <img src={image} alt="TEst"/>
        <div className="episode-informations">
            <label>{title}</label>
            <div className="episode-controls">
                <button className="play-button">Play</button>
                <label>35min</label>
            </div>
        </div>
    </div>
  )
}
