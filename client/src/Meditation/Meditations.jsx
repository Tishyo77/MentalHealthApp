import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import './Meditations.css';


let player;

const Meditations = forwardRef(({ name }, ref) => {
    const [meditationLinks, setMeditationLinks] = useState([]);
    const [meditationTitles, setMeditationTitles] = useState([]);
    const [currentVideoId, setCurrentVideoId] = useState(null);
    const [videoDurations, setVideoDurations] = useState({}); 
    const [currentMeditationIndex, setCurrentMeditationIndex] = useState(0);
    let headingName;

    if(name === "sleep")
        headingName = "Sleep";

    useImperativeHandle(ref, () => ({
        togglePause() {
            if (player) {
                if (player.getPlayerState() === 1) { // Playing
                    player.pauseVideo();
                } else if (player.getPlayerState() === 2) { // Paused
                    player.playVideo();
                }
            }
        },
        nextMeditation() {
            if (currentMeditationIndex < meditationLinks.length - 1) {
                setCurrentMeditationIndex(currentMeditationIndex + 1);
                const videoId = getYouTubeVideoId(meditationLinks[currentMeditationIndex + 1]);
                setCurrentVideoId(videoId);
                if (player) {
                    player.cueVideoById({videoId: videoId, startSeconds: 0});
                    player.seekTo(0); // Seek to the beginning of the video
                }
            }
        },
        previousMeditation() {
            if (currentMeditationIndex > 0) {
                setCurrentMeditationIndex(currentMeditationIndex - 1);
                const videoId = getYouTubeVideoId(meditationLinks[currentMeditationIndex - 1]);
                setCurrentVideoId(videoId);
                if (player) {
                    player.cueVideoById({videoId: videoId, startSeconds: 0});
                    player.seekTo(0); // Seek to the beginning of the video
                }
            }
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
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=g`);
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

    const handlePlayClick = (index) => {
        const videoId = getYouTubeVideoId(meditationLinks[index]);
        setCurrentVideoId(videoId);
        if (player) {
            player.cueVideoById(videoId, 0); // Cue the video
            player.playVideo(); // Start playing the video
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
            window.onYouTubeIframeAPIReady = () => createPlayer(videoId);
        }
    };

    const createPlayer = (videoId) => {
        if (player) {
            player.destroy();
        }
    
        player = new window.YT.Player('player', {
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
                }
            }
        });
    };
    
    const onPlayerReady = (event) => {
        event.target.playVideo();
    };

    return (
        <div className="meditations-container">
            <div className='heading'>
                <h1>Guided Meditations</h1>
            </div>
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
                                    <button onClick={() => handlePlayClick(index)}>Play</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div id="player"></div>
        </div>
    );
});

export default Meditations;
