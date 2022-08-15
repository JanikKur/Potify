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

export default function Podcast() {

    const navigate = useNavigate();

    const [podcast, setPodcast] = useState(null);
    const {currentEpisode, updateEpisode, setCurrentTitle} = useEpisode();
    const {currentUser, toggleSubscription, isSubscribed} = useUser();
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

    function editPodcast(){

    }

    if(isLoading) return <main><Loading/></main>
    if(!podcast || !currentEpisode) return null;
    return (
        <>
        <main className="podcast">
            <div className="podcast-informations">
                <img alt="Teest" src={`/${podcast.fileLinks[0]}`} />
                <h2>{podcast.title}</h2>
                <h4>{podcast.description}</h4>
                <div className="podcast-controls">
                    {currentUser && <button className="icon-button" onClick={() => toggleSubscription(podcast._id)}>{isSubscribed(podcast._id) ? <BsFillHeartFill className="subscribed"/> : <BiHeart/>}</button>}
                    {currentUser && currentUser._id ===  podcast.author && <Link to={`/addepisode?id=${podcast._id}`} className="icon-link"><BiAddToQueue/></Link>}
                    {currentUser && currentUser._id ===  podcast.author && <button className="icon-button" onClick={editPodcast}><BiEditAlt/></button>}
                    {currentUser && currentUser._id ===  podcast.author && <button className="icon-button" onClick={deletePodcast}><RiDeleteBin6Line/></button>}
                </div>
            </div>
            <div className="episodes-list">
                <h4>Alle Episoden:</h4>
                {!podcast.episodes.length ? 'No Episodes yet' : podcast.episodes.map((episode, idx) => <Episode key={idx} onClick={link => {updateEpisode(link); setCurrentTitle(episode.title)}} currentEpisode={currentEpisode} episodeLink={`/api/v1/podcast/play/${episode.fileLinks[0]}`} image={`${podcast.fileLinks[0]}`} title={episode.title} />)}
            </div>
        </main>
        </>
    )
}
