import React, { useState, useEffect } from "react";
import APIKit from "./Spotify";
import "./library.css";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";

export default function SpecificPlaylist({ playlistId }) {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    // Make API request to fetch the specific playlist by ID
    APIKit.get(`playlists/${playlistId}`).then(function (response) {
      setPlaylist(response.data);
    });
  }, [playlistId]);

  const navigate = useNavigate();

  const playPlaylist = () => {
    navigate("/meditate", { state: { id: playlist.id } });
  };

  if (!playlist) {
    return <div>Loading...</div>; // Add a loading state while fetching data
  }

  return (
    <div className="screen-container">
      <div className="library-body">
        <div
          className="playlist-card"
          onClick={playPlaylist}
        >
          <img
            src={playlist.images[0].url}
            className="playlist-image"
            alt="Playlist-Art"
          />
          <p className="playlist-title">{playlist.name}</p>
          <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
          <div className="playlist-fade">
              <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
        </div>
      </div>
    </div>
  );
}