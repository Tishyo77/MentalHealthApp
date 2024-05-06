import React from 'react';
import sleepImage from '../Images/Sleep.jpg'; 
//import morningImage from './morning_image.jpg';
//import anxietyImage from './anxiety_image.jpg';
import "./Playlists.css"; 

const Playlists = ({ onPlaylistClick }) => {
    return (
        <div className="playlist-container">
            <div className='heading'>
                <h1>Guided Meditations</h1>
            </div>
            <div className='subheading'>
                <h2>Meditation by Type</h2>
            </div>
            <div className='playlist-cards'>
                <div className="playlist-card" onClick={() => onPlaylistClick('sleep')}>
                    <img src={sleepImage} alt="Sleep Meditation" />
                    <h3>Sleep Meditation</h3>
                </div>
                <div className="playlist-card" onClick={() => onPlaylistClick('morning')}>
                    <img src={sleepImage} alt="Morning Meditation" />
                    <h3>Morning Meditation</h3>
                </div>
                <div className="playlist-card" onClick={() => onPlaylistClick('anxiety')}>
                    <img src={sleepImage} alt="Anxiety Meditation" />
                    <h3>Anxiety Meditation</h3>
                </div>
            </div>
            <div className='subheading'>
                <h2>Meditation by Type</h2>
            </div>
            <div className='playlist-cards'>
                <div className="playlist-card" onClick={() => onPlaylistClick('sleep')}>
                    <img src={sleepImage} alt="Sleep Meditation" />
                    <h3>Sleep Meditation</h3>
                </div>
                <div className="playlist-card" onClick={() => onPlaylistClick('morning')}>
                    <img src={sleepImage} alt="Morning Meditation" />
                    <h3>Morning Meditation</h3>
                </div>
                <div className="playlist-card" onClick={() => onPlaylistClick('anxiety')}>
                    <img src={sleepImage} alt="Anxiety Meditation" />
                    <h3>Anxiety Meditation</h3>
                </div>
            </div>
        </div>
        
      
    );
};

export default Playlists;
