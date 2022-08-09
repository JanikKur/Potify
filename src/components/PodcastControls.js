import React, { useState } from 'react'
import '../assets/styles/components/podcastControls.css';
import { MdOutlineForward10, MdOutlineReplay10, MdOutlinePause, MdOutlinePlayArrow, MdVolumeDownAlt } from 'react-icons/md';

export default function PodcastControls() {

    const [hideVolume, setHideVolume] = useState(true);


    return (
        <nav className="episode-play-controls">
            <div className="progress-bar-wrapper">
                <input type="range" defaultValue={0} className="progress-bar" />
                <div className="progress-bar-whatched"></div>
                <div className="progress-bar-buffered"></div>
            </div>
            <div className="episode-informations2">
                <label>Von Fritz Meinecke ...</label>
                <label>3:15 / 35:00</label>
            </div>
            <div className="control-buttons">
                <div className="volume-controls">
                    <button className="control-btn volume" onClick={() => setHideVolume(!hideVolume)}><MdVolumeDownAlt className="icon" /></button>
                    <div className={`volume-bar ${hideVolume ? 'hide' : ''}`}>
                        <input type="range" defaultValue={0} className="progress-bar" />
                    </div>
                </div>
                <button className="control-btn rev" ><MdOutlineReplay10 className="icon" /></button>
                <button className="control-btn pause" >{true ? <MdOutlinePause className="icon" /> : <MdOutlinePlayArrow className="icon" />}</button>
                <button className="control-btn fwd" ><MdOutlineForward10 className="icon" /></button>
            </div>
        </nav>
    )
}
