import React, { useState, useEffect } from "react";
import APIKit from "./Spotify";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import "./SpecificPlaylist.css";
import { useNavigate } from "react-router-dom";

export default function SpecificPlaylist() {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const playlistIds = ["2k4jk8vRef57GPkYuHsIMs?si=TqT0XnCETLqGzX27WCma6w&pi=a-7Mr33gaNQwSJ", "4uugAAmDk3A4HLpTGH8DG1?si=IGiHLjgWTaywpAaZB3UkMg&pi=a-Q_5b1InuQ3Kq", "1tP8pZNpZCCPpbmNduJcvY?si=8sGaCWR5SEG4BY_d9dvaow"]; 

    const fetchPlaylists = async () => {
      const promises = playlistIds.map((id) => APIKit.get(`playlists/${id}`));
      try {
        const responses = await Promise.all(promises);
        const playlistsData = responses.map((response) => response.data);
        setPlaylists(playlistsData);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate("/meditate", { state: { id: id } });
  };

  return (
    <div className="screen-container">
      <div className="library-body">
        {playlists?.map((playlist) => (
          <div
            className="playlist-card"
            key={playlist.id}
            onClick={() => playPlaylist(playlist.id)}
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
        ))}
      </div>
    </div>
  );
}
