import React, { useContext, useState, useEffect } from 'react';

const EpisodeContext = React.createContext();

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