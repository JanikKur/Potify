import React, { useEffect, useRef, useState } from 'react'
import '../assets/styles/components/podcastControls.css';
import { MdOutlineForward10, MdOutlineReplay10, MdOutlinePause, MdOutlinePlayArrow, MdVolumeDownAlt } from 'react-icons/md';

export default function PodcastControls({title, episode}) {

    const [hideVolume, setHideVolume] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [timestamp, setTimestamp] = useState("");
    const progressBarRef = useRef();
    const whatchedTimeLineRef = useRef();
    const bufferedLineRef = useRef();

    useEffect(() => {
        episode.addEventListener("timeupdate", e => {
            let percentage = e.target.currentTime / e.target.duration * 100;
            progressBarRef.current.value = Math.round(percentage);
            updatedWhatchedTime(Math.round(percentage));
            
            setTimestamp(`${(Math.floor(e.target.currentTime / 60) + "")}:${(Math.floor(e.target.currentTime % 60) + "").padStart(2, '0')} / ${(Math.floor(e.target.duration / 60) + "")}:${(Math.floor(e.target.duration % 60) + "").padStart(2, '0')}`);

            let bufferedSeconds = episode.buffered.end(0) - episode.buffered.start(0);
            updateBufferedLine(Math.round(bufferedSeconds / e.target.duration * 100));
        });
        episode.addEventListener("ended",() => setIsPlaying(false));
        episode.autoplay = true;
    }, [episode]);


    useEffect(() => {
        setIsPlaying(!episode.paused);
    },[episode.paused]);


    function togglePlaying(){
        if(isPlaying){
            episode.pause()
        }else{
            episode.play()
        }
        setIsPlaying(!isPlaying);
    }

    function updateTime(e){
        episode.currentTime = episode.duration / 100 * e.target.value;
    }

    function addSeconds(seconds){
        episode.currentTime = episode.currentTime + seconds;
    }

    function updatedWhatchedTime(percentage){
        whatchedTimeLineRef.current.style.width = percentage + "%";
    }

    function updateBufferedLine(percentage){
        bufferedLineRef.current.style.width = percentage + "%";
    }

    if(!episode.src) return null;
    return (
        <nav className="episode-play-controls">
            <div className="progress-bar-wrapper">
                <input type="range" defaultValue={0} onChange={e => {updateTime(e); updatedWhatchedTime(e.target.value);}} onClick={updateTime}  ref={progressBarRef} className="progress-bar" />
                <div className="progress-bar-whatched" ref={whatchedTimeLineRef}></div>
                <div className="progress-bar-buffered" ref={bufferedLineRef}></div>
            </div>
            <div className="episode-informations2">
                <label>{title.substring(0,15)}...</label>
                <label>{timestamp}</label>
            </div>
            <div className="control-buttons">
                <div className="volume-controls">
                    <button className="control-btn volume" onClick={() => setHideVolume(!hideVolume)}><MdVolumeDownAlt className="icon" /></button>
                    <div className={`volume-bar ${hideVolume ? 'hide' : ''}`}>
                        <input type="range" defaultValue={episode.volume * 100} onChange={e => {episode.volume = e.target.value / 100}} className="progress-bar" />
                    </div>
                </div>
                <button className="control-btn rev" onClick={() => addSeconds(-10)}><MdOutlineReplay10 className="icon" /></button>
                <button className="control-btn pause" onClick={togglePlaying}>{isPlaying ? <MdOutlinePause className="icon" /> : <MdOutlinePlayArrow className="icon" />}</button>
                <button className="control-btn fwd" onClick={() => addSeconds(+10)}><MdOutlineForward10 className="icon" /></button>
            </div>
        </nav>
    )
}
