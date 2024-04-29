import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

const CoverCard = ({ currentVideoId, player }) => {
    const [youTubePlayer, setYouTubePlayer] = useState(null);

    useEffect(() => {
        if (currentVideoId) {
            loadPlayer(currentVideoId);
        }
    }, [currentVideoId]);

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
    };

    const createPlayer = (videoId) => {
        const newPlayer = new window.YT.Player('player', {
            height: '390',
            width: '640',
            videoId: videoId,
            playerVars: {
                autoplay: 1,
                controls: 1,
            },
            events: {
                onReady: (event) => {
                    setYouTubePlayer(event.target);
                    player.current = event.target;
                },
            },
        });
    };

    return (
        <div className='youtube'>
            <div id="player">
                    <YouTube
                        videoId={currentVideoId}
                        opts={{
                            height: '390',
                            width: '640',
                            playerVars: {
                                autoplay: 1,
                                controls: 1,
                            },
                        }}
                    />
            </div>
        </div>
    );
};

export default CoverCard;