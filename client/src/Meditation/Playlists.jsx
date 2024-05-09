import React from 'react';
import sleepImage from '../Images/Sleep.jpg'; 
//import morningImage from './morning_image.jpg';
//import anxietyImage from './anxiety_image.jpg';
import "./Playlists.css"; 

const Playlists = ({ onPlaylistClick }) => {
    return (
        <div className="playlist-container">
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
                <div className="playlist-card" onClick={() => onPlaylistClick('mindfulness')}>
                    <img src={sleepImage} alt="Anxiety Meditation" />
                    <h3>Mindfulness Meditation</h3>
                </div>
            </div>
            <div className='subheading'>
                <h2>Meditation by Duration</h2>
            </div>
            <div className='playlist-cards'>
                <div className="playlist-card" onClick={() => onPlaylistClick('5min')}>
                    <img src={sleepImage} alt="5 Minute Meditation" />
                    <h3>5 Minute Meditation</h3>
                </div>
                <div className="playlist-card" onClick={() => onPlaylistClick('10min')}>
                    <img src={sleepImage} alt="10 Minute Meditation" />
                    <h3>10 Minute Meditation</h3>
                </div>
                <div className="playlist-card" onClick={() => onPlaylistClick('20min')}>
                    <img src={sleepImage} alt="20 Minute Meditation" />
                    <h3>20 Minute Meditation</h3>
                </div>
            </div>
        </div>    
    );
};

export default Playlists;
