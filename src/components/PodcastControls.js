import React, { useEffect, useRef, useState } from 'react'
import '../assets/styles/components/podcastControls.css';
import { MdOutlineForward10, MdOutlineReplay10, MdOutlinePause, MdOutlinePlayArrow, MdVolumeDownAlt } from 'react-icons/md';
import {useEpisode} from '../contexts/EpisodeContext';

export default function PodcastControls() {

    const [hideVolume, setHideVolume] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [timestamp, setTimestamp] = useState("");
    const progressBarRef = useRef();
    const whatchedTimeLineRef = useRef();
    const bufferedLineRef = useRef();
    const {currentEpisode, currentTitle} = useEpisode();

    useEffect(() => {
        currentEpisode.addEventListener("timeupdate", e => {
            let percentage = e.target.currentTime / e.target.duration * 100;
            progressBarRef.current.value = Math.round(percentage);
            updatedWhatchedTime(Math.round(percentage));
            
            setTimestamp(`${(Math.floor(e.target.currentTime / 60) + "")}:${(Math.floor(e.target.currentTime % 60) + "").padStart(2, '0')} / ${(Math.floor(e.target.duration / 60) + "")}:${(Math.floor(e.target.duration % 60) + "").padStart(2, '0')}`);

            let bufferedSeconds = currentEpisode.buffered.end(0) - currentEpisode.buffered.start(0);
            updateBufferedLine(Math.round(bufferedSeconds / e.target.duration * 100));
        });
        currentEpisode.addEventListener("ended",() => setIsPlaying(false));
        currentEpisode.autoplay = true;
    }, [currentEpisode]);


    useEffect(() => {
        setIsPlaying(!currentEpisode.paused);
    },[currentEpisode.paused]);


    function togglePlaying(){
        if(isPlaying){
            currentEpisode.pause()
        }else{
            currentEpisode.play()
        }
        setIsPlaying(!isPlaying);
    }

    function updateTime(e){
        currentEpisode.currentTime = currentEpisode.duration / 100 * e.target.value;
    }

    function addSeconds(seconds){
        currentEpisode.currentTime = currentEpisode.currentTime + seconds;
    }

    function updatedWhatchedTime(percentage){
        whatchedTimeLineRef.current.style.width = percentage + "%";
    }

    function updateBufferedLine(percentage){
        bufferedLineRef.current.style.width = percentage + "%";
    }

    if(!currentEpisode.src) return null;
    return (
        <nav className="episode-play-controls">
            <div className="progress-bar-wrapper">
                <input type="range" defaultValue={0} onChange={e => {updateTime(e); updatedWhatchedTime(e.target.value);}} onClick={updateTime}  ref={progressBarRef} className="progress-bar" />
                <div className="progress-bar-whatched" ref={whatchedTimeLineRef}></div>
                <div className="progress-bar-buffered" ref={bufferedLineRef}></div>
            </div>
            <div className="episode-informations2">
                <label>{currentTitle.substring(0,15)}...</label>
                <label>{timestamp}</label>
            </div>
            <div className="control-buttons">
                <div className="volume-controls">
                    <button className="control-btn volume" onClick={() => setHideVolume(!hideVolume)}><MdVolumeDownAlt className="icon" /></button>
                    <div className={`volume-bar ${hideVolume ? 'hide' : ''}`}>
                        <input type="range" defaultValue={currentEpisode.volume * 100} onChange={e => {currentEpisode.volume = e.target.value / 100}} className="progress-bar" />
                    </div>
                </div>
                <button className="control-btn rev" onClick={() => addSeconds(-10)}><MdOutlineReplay10 className="icon" /></button>
                <button className="control-btn pause" onClick={togglePlaying}>{isPlaying ? <MdOutlinePause className="icon" /> : <MdOutlinePlayArrow className="icon" />}</button>
                <button className="control-btn fwd" onClick={() => addSeconds(+10)}><MdOutlineForward10 className="icon" /></button>
            </div>
        </nav>
    )
}
