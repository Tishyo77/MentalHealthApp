import React from 'react';
import sleepImage from '../Images/Sleep.jpg'; 
import morningImage from '../Images/Morning.jpg';
import mindfulnessImage from '../Images/Mindfulness.jpg';
import tenImage from '../Images/Ten.png';
import twentyImage from '../Images/Twenty.png';
import fiveImage from '../Images/Five.png';
import "./Playlists.css"; 

const Playlists = ({ onPlaylistClick }) => {
    return (
        <div className="playlist-container">
            <div className='subheading'>
                <h2>Meditation by Type</h2>
            </div>
            <div className='playlist-cards'>
                <div className="playlist-card" onClick={() => onPlaylistClick('Sleep')}>
                    <img src={sleepImage} alt="Sleep Meditation" />
                    <h3>Sleep Meditation</h3>
                </div>
                <div className="playlist-card" onClick={() => onPlaylistClick('Morning')}>
                    <img src={morningImage} alt="Morning Meditation" />
                    <h3>Morning Meditation</h3>
                </div>
                <div className="playlist-card" onClick={() => onPlaylistClick('Mindfulness')}>
                    <img src={mindfulnessImage} alt="Anxiety Meditation" />
                    <h3>Mindfulness Meditation</h3>
                </div>
            </div>
            <div className='subheading'>
                <h2>Meditation by Duration</h2>
            </div>
            <div className='playlist-cards'>
                <div className="playlist-card" onClick={() => onPlaylistClick('5 Minute')}>
                    <img src={fiveImage} alt="5 Minute Meditation" />
                    <h3>5 Minute Meditation</h3>
                </div>
                <div className="playlist-card" onClick={() => onPlaylistClick('10 Minute')}>
                    <img src={tenImage} alt="10 Minute Meditation" />
                    <h3>10 Minute Meditation</h3>
                </div>
                <div className="playlist-card" onClick={() => onPlaylistClick('20 Minute')}>
                    <img src={twentyImage} alt="20 Minute Meditation" />
                    <h3>20 Minute Meditation</h3>
                </div>
            </div>
        </div>    
    );
};

export default Playlists;
