import React from 'react';
import './Playlists.css'; 
import  NavBar  from './NavBar';
import SpecificPlaylist from './SpecificPlaylist';
import Logo from './Images/SSLogo.png'; 
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

const Playlists = () => {
  return (
    <div className="playlist-container">
        <div className="playlists-page">
            <div className="background">
            </div>
            <NavBar />
            <h1>Specific Playlist Page</h1>
            <SpecificPlaylist playlistId="2huscUGmt5fIt7mxtcvXV9?si=e6b4a41e007b4a4c" />
            <SpecificPlaylist playlistId="2huscUGmt5fIt7mxtcvXV9?si=e6b4a41e007b4a4c" />
            <SpecificPlaylist playlistId="2huscUGmt5fIt7mxtcvXV9?si=e6b4a41e007b4a4c" />
        </div>
    </div>
  );
};

export default Playlists;