import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import CoverCard from './CoverCard';
import Controller from './Controller';
import './Meditations.css';
import playIcon from '../Icons/Play.png';

const Meditations = forwardRef(({ name }, ref) => {
    const [meditationLinks, setMeditationLinks] = useState([]);
    const [meditationTitles, setMeditationTitles] = useState([]);
    const [currentVideoId, setCurrentVideoId] = useState(null);
    const [videoDurations, setVideoDurations] = useState({});
    const [currentMeditationIndex, setCurrentMeditationIndex] = useState(0);
    const [player, setPlayer] = useState(null);
    const playerRef = useRef(null); // New ref to store the player instance
    const meditationsRef = useRef();
    let headingName;
    const userEmail = localStorage.getItem('email');

        headingName = name;

    useImperativeHandle(ref, () => ({
        togglePause() {
            togglePause();
        },
        nextMeditation() {
            nextMeditation();
        },
        previousMeditation() {
            previousMeditation();
        }
    }));

    useEffect(() => {
        const fetchMeditations = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/meditateRoute/retrieve?name=${name}`);
                const filteredMeditations = response.data.filter(meditation => meditation.name === name);

                const links = filteredMeditations.map(meditation => meditation.links).flat();
                const titles = filteredMeditations.map(meditation => meditation.titles).flat();

                setMeditationLinks(links);
                setMeditationTitles(titles);

                // Fetch and store video durations
                const durations = {};
                await Promise.all(links.map(async link => {
                    const videoId = getYouTubeVideoId(link);
                    if (videoId) {
                        const duration = await fetchVideoDuration(videoId);
                        durations[videoId] = duration;
                    }
                }));
                setVideoDurations(durations);
            } catch (error) {
                console.error('Error fetching meditations:', error);
            }
        };

        fetchMeditations();
    }, [name]);

    useEffect(() => {
        if (currentVideoId) {
            loadPlayer(currentVideoId);
        }
    }, [currentVideoId]);

    const fetchVideoDuration = async (videoId) => {
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=AIzaSyAHHDjp5LO4facG2HRW2GBgxVN874a3eus`);
            const duration = response.data.items[0].contentDetails.duration;
            return formatDuration(duration);
        } catch (error) {
            console.error('Error fetching video duration:', error);
            return '';
        }
    };

    const formatDuration = (duration) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = match[1] ? parseInt(match[1]) : 0;
        const minutes = match[2] ? parseInt(match[2]) : 0;
        const seconds = match[3] ? parseInt(match[3]) : 0;

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    };

    const padZero = (number) => {
        return number.toString().padStart(2, '0');
    };

    const handlePlayClick = async (index) => {
        const videoId = getYouTubeVideoId(meditationLinks[index]);
        setCurrentVideoId(videoId);
        setCurrentMeditationIndex(index);
        if (playerRef.current) {
            playerRef.current.cueVideoById({ videoId: videoId, startSeconds: 0 });
            playerRef.current.playVideo();
        } else {
            // Load the player if it's not available yet
            loadPlayer(videoId);
        }

        // Update the last heard meditation details
        const name = meditationTitles[index];
        const duration = String(videoDurations[videoId]);
        const link = meditationLinks[index];

        try {
            console.log(userEmail);
            await axios.put('http://localhost:4000/detailsRoute/update-last-meditation', {
                email: userEmail,
                name,
                duration,
                link,
            });
        } catch (err) {
            console.error('Error updating last heard meditation:', err);
        }
    };

    const getYouTubeVideoId = (url) => {
        const match = url.match(/[?&]v=([^&]+)/);
        return match && match[1];
    };

    const loadPlayer = (videoId) => {
        if (window.YT && window.YT.Player) {
          createPlayer(videoId);
        } else {
          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          const firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          window.onYouTubeIframeAPIReady = () => {
            createPlayer(videoId);
          };
        }
        // Call createPlayer directly if the API is already loaded
        if (window.YT && window.YT.Player && !playerRef.current) {
          createPlayer(videoId);
        }
      };

      const createPlayer = (videoId) => {
        if (playerRef.current) {
            playerRef.current.destroy(); // Destroy the existing player if it exists
        }

        const newPlayer = new window.YT.Player('player', {
            height: '0',
            width: '0',
            videoId: videoId,
            playerVars: {
                controls: 0,
                disablekb: 1,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
            },
            events: {
                onReady: (event) => {
                    event.target.playVideo(); // Start playing the video
                },
            },
        });

        setPlayer(newPlayer);
        playerRef.current = newPlayer; // Update playerRef.current with the new player instance
    };

    const togglePause = () => {
        if (playerRef.current) {
            if (playerRef.current.getPlayerState() === 1) { // Playing
                playerRef.current.pauseVideo();
            } else if (playerRef.current.getPlayerState() === 2) { // Paused
                playerRef.current.playVideo();
            }
        }
    };

    const nextMeditation = async () => {
        if (currentMeditationIndex < meditationLinks.length - 1) {
          const newIndex = currentMeditationIndex + 1;
          setCurrentMeditationIndex(newIndex);
          const videoId = getYouTubeVideoId(meditationLinks[newIndex]);
          setCurrentVideoId(videoId);
      
            // Update the last heard meditation details
            const name = meditationTitles[newIndex];
            const duration = String(videoDurations[videoId]);
            const link = meditationLinks[newIndex];
      
            try {
              await axios.put('http://localhost:4000/detailsRoute/update-last-meditation', {
                email: userEmail,
                name,
                duration,
                link,
              });
            } catch (err) {
              console.error('Error updating last heard meditation:', err);
            }
          }
      };
      
      const previousMeditation = async () => {
        if (currentMeditationIndex > 0) {
          const newIndex = currentMeditationIndex - 1;
          setCurrentMeditationIndex(newIndex);
          const videoId = getYouTubeVideoId(meditationLinks[newIndex]);
          setCurrentVideoId(videoId);
      
            // Update the last heard meditation details
            const name = meditationTitles[newIndex];
            const duration = String(videoDurations[videoId]);
            const link = meditationLinks[newIndex];
      
            try {
              await axios.put('http://localhost:4000/detailsRoute/update-last-meditation', {
                email: userEmail,
                name,
                duration,
                link,
              });
            } catch (err) {
              console.error('Error updating last heard meditation:', err);
            }
          }
      };
    

    return (
        <div>
            <div className="meditations-container">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-7'>
                            <div className='meditation-list'>
                                <h2>{headingName} Meditations</h2>  
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Duration</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {meditationTitles.map((title, index) => (
                                            <tr key={index}>
                                                <td>{title}</td>
                                                <td>{videoDurations[getYouTubeVideoId(meditationLinks[index])]}</td>
                                                <td>
                                                <button className="play" onClick={() => handlePlayClick(index)}>
                                                    <img src={playIcon} alt="Play" />
                                                </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div> {/*end of meditation-list */}
                        </div> {/*end of col-7 (left half) */}

                        <div className='col-5'>
                            {/*CoverCard*/}
                            <div className=' mb-5 d-flex justify-content-center align-items-center h-80'>
                                <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: "10px", marginTop: '2.5%'}}>
                                    <CoverCard currentVideoId={currentVideoId} player={playerRef} />
                                </div>
                            </div>

                            {/*controller*/}
                            <div className='mt -5 d-flex justify-content-center'>
                                <div className="controller" style={{ paddingTop: '7%', paddingBottom: '7%',backgroundColor: 'white', borderRadius: "10px", paddingLeft: '7%', paddingRight: '7%'}}> 
                                    <Controller onNext={nextMeditation} onPrevious={previousMeditation} onPauseToggle={togglePause} />
                                </div>
                            </div>
                        </div> {/*end of col-5 (right half) */}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Meditations;
