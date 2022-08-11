import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

const EpisodeContext = React.createContext();
const backendLink = process.env.REACT_APP_BACKEND_URL + '/api/v1';

export function useEpisode() {
    return useContext(EpisodeContext);
}



export function EpisodeProvider({ children }) {
    const [currentEpisode, setCurrentEpisode] = useState(new Audio());
    const [currentTitle, setCurrentTitle] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setCurrentEpisode(currentEpisode);
        setLoading(false);
    }, [currentEpisode]);

    function updateEpisode(episodeLink) {
        currentEpisode.pause();
        setCurrentEpisode((prev) => { return new Audio(episodeLink) })
    }

    const value = {
        currentEpisode,
        setCurrentEpisode,
        updateEpisode,
        currentTitle, 
        setCurrentTitle
    };

    return (
        <EpisodeContext.Provider value={value}>
            {!loading && children}
        </EpisodeContext.Provider>
    );
}