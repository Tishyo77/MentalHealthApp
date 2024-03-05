import React from 'react';
import './MeditationPage.css'; 
import  NavBar  from './NavBar';
import SongCard from "./SongCard";
import Queue from "./Queue";
import apiClient from './Spotify';
import SpecificPlaylist from './SpecificPlaylist';
import AudioPLayer from './AudioPlayer';
import Logo from './Images/SSLogo.png'; 
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

const MeditationPage = () => {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (location.state) {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((res) => {
          setTracks(res.data.items);
          setCurrentTrack(res.data?.items[0]?.track);
        });
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track);
  }, [currentIndex, tracks]);

  return (
    <div className="meditation-container">
      <NavBar />
      <div className="meditation-page flex">
        <div className="left-player-body">
          <AudioPLayer
            currentTrack={currentTrack}
            total={tracks}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
          <div className="playlists">
            <SpecificPlaylist />
          </div>
        </div>
        <div className="right-player-body">
          <SongCard album={currentTrack?.album}/>
          <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
        </div>
      </div>
    </div>
  );
};

export default MeditationPage;