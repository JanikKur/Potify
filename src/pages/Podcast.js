import React, { useEffect, useState } from 'react'
import '../assets/styles/pages/podcast.css';
import {BiHeart,BiAddToQueue, BiEditAlt} from 'react-icons/bi';
import {BsFillHeartFill} from 'react-icons/bs';
import {RiDeleteBin6Line} from 'react-icons/ri';
import Episode from '../components/Episode';
import { Link, useNavigate } from 'react-router-dom';
import { deletePodcast as deletePodcastService, getPodcastById } from '../services/podcast';
import {useUser} from '../contexts/UserContext';
import {useEpisode} from '../contexts/EpisodeContext';
import Loading from '../components/Loading';
import EpisodeSettings from '../components/EpisodeSettings';
import PodcastSettings from '../components/PodcastSettings';

export default function Podcast() {

    const navigate = useNavigate();

    const [podcast, setPodcast] = useState(null);
    const {currentEpisode, updateEpisode, setCurrentTitle} = useEpisode();
    const [currentEditEpisode, setCurrentEditEpisode] = useState(null);
    const {currentUser, toggleSubscription, isSubscribed} = useUser();
    const [showSettings, setShowSettings] = useState(false);
    const [showEpisodeSettings, setShowEpisodeSettings] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get('id');
        getPodcastById(id !== "undefined" ? id : '62f38940662a95ffecfa96e7').then(res => { //TODO
            setPodcast(res.data.podcast);
            setIsLoading(false);
        }).catch(err => {});
    },[]);


    async function deletePodcast(){
        if(window.confirm("Are you shure to delete this Podcast?")){
            await deletePodcastService(podcast._id);
            navigate('/', { replace: true });
        }
    }

    if(isLoading) return <main><Loading/></main>
    if(!podcast || !currentEpisode) return null;
    return (
        <>
        <main className="podcast">
            {showEpisodeSettings && <EpisodeSettings setPodcast={setPodcast} setShowEpisodeSettings={setShowEpisodeSettings} episode={currentEditEpisode}/>}
            {showSettings && <PodcastSettings setShowSettings={setShowSettings} setPodcast={setPodcast} podcast={podcast}/>}
            <div className="podcast-informations">
                <img alt={podcast.title} src={`${process.env.REACT_APP_BACKEND_URL}${podcast.fileLinks[0]}`} />
                <h2>{podcast.title}</h2>
                <h4>{podcast.description}</h4>
                <div className="podcast-controls">
                    {currentUser && <button className="icon-button" onClick={() => toggleSubscription(podcast._id)}>{isSubscribed(podcast._id) ? <BsFillHeartFill className="subscribed"/> : <BiHeart/>}</button>}
                    {currentUser && currentUser._id ===  podcast.author && <Link to={`/addepisode?id=${podcast._id}`} className="icon-link"><BiAddToQueue/></Link>}
                    {currentUser && currentUser._id ===  podcast.author && <button className="icon-button" onClick={() => setShowSettings(true)}><BiEditAlt/></button>}
                    {currentUser && currentUser._id ===  podcast.author && <button className="icon-button" onClick={deletePodcast}><RiDeleteBin6Line/></button>}
                </div>
            </div>
            <div className="episodes-list">
                <h4>Alle Episoden:</h4>
                {!podcast.episodes.length ? 'No Episodes yet' : podcast.episodes.map((episode, idx) => <Episode key={idx} podcastAuthor={podcast.author} setShowEpisodeSettings={setShowEpisodeSettings} setCurrentEditEpisode={setCurrentEditEpisode} episode={episode} onClick={link => {updateEpisode(link); setCurrentTitle(episode.title)}} currentEpisode={currentEpisode} episodeLink={`${process.env.REACT_APP_BACKEND_URL}/api/v1/podcast/play/${episode.fileLinks[0]}`} image={`${process.env.REACT_APP_BACKEND_URL}${podcast.fileLinks[0]}`} title={episode.title} />)}
            </div>
        </main>
        </>
    )
}
