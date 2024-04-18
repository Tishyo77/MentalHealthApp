import React, { useState, useRef } from 'react';
import NavBar from '../NavBar';
import Meditations from './Meditations';
import Controller from './Controller';
import Playlists from './Playlists';
import "./MeditationPage.css";

const MeditationPage = () => {
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const meditationsRef = useRef();

    const handlePlaylistClick = (playlistName) => {
        setCurrentPlaylist(playlistName);
    };

    const nextMeditation = () => {
        if (meditationsRef.current) {
            meditationsRef.current.nextMeditation();
        }
    };

    const previousMeditation = () => {
        if (meditationsRef.current) {
            meditationsRef.current.previousMeditation();
        }
    };

    const togglePause = () => {
        if (meditationsRef.current) {
            meditationsRef.current.togglePause();
        }
    };

    const handleProgressBarChange = (value) => {
        if (meditationsRef.current) {
            meditationsRef.current.seekTo(parseInt(value));
        }
    };

    return (
        <div className="meditation-page-container">
            <NavBar />
            <div className="meditation-page">
                <div className='playlist-and-items'>
                    {currentPlaylist ? (
                        <Meditations
                            ref={meditationsRef}
                            name={currentPlaylist}
                            onDurationChange={setDuration}
                            onCurrentTimeChange={setCurrentTime}
                        />
                    ) : (
                        <Playlists onPlaylistClick={handlePlaylistClick} />
                    )}
                </div>
                <div className="controller">
                    <Controller
                        onNext={nextMeditation}
                        onPrevious={previousMeditation}
                        onPauseToggle={togglePause}
                        onProgressBarChange={handleProgressBarChange}
                        currentTime={currentTime}
                        duration={duration}
                    />
                </div>
            </div>
        </div>
    );
};

export default MeditationPage;
