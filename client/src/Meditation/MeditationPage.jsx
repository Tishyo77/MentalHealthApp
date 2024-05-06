// MeditationPage.jsx
import React, { useState, useRef } from 'react';
import NavBar from '../NavBar';
import Meditations from './Meditations';
import Controller from './Controller';
import Playlists from './Playlists';
import CoverCard from './CoverCard';
import "./MeditationPage.css";

const MeditationPage = () => {
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const meditationsRef = useRef();
    const [showBackButton, setShowBackButton] = useState(false);

    const handlePlaylistClick = (playlistName) => {
        setCurrentPlaylist(playlistName);
        setShowBackButton(true);
    };

    const handleBackButtonClick = () => {
        setCurrentPlaylist(null);
        setShowBackButton(false);
    };

    // const nextMeditation = () => {
    //     if (meditationsRef.current) {
    //         meditationsRef.current.nextMeditation();
    //     }
    // };

    // const previousMeditation = () => {
    //     if (meditationsRef.current) {
    //         meditationsRef.current.previousMeditation();
    //     }
    // };

    // const togglePause = () => {
    //     if (meditationsRef.current) {
    //         meditationsRef.current.togglePause();
    //     }
    // };

    return (
        <div className="meditation-page-container">
            <NavBar />
            <div className="meditation-page" >
                {showBackButton && (
                    <button onClick={handleBackButtonClick}>Back</button>
                )}
                {/* <div className='playlist-and-items'> */}
                    {currentPlaylist ? (
                        <Meditations ref={meditationsRef} name={currentPlaylist} />
                    ) : (
                        <Playlists onPlaylistClick={handlePlaylistClick} />
                    )}
                {/* </div> */}
                {/* <div className="controller">
                    <Controller onNext={nextMeditation} onPrevious={previousMeditation} onPauseToggle={togglePause} />
                </div> */}
            </div>
        </div>
    );
};

export default MeditationPage;
