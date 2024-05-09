import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

const CoverCard = ({ currentVideoId, player }) => {
    useEffect(() => {
        if (currentVideoId) {
            loadPlayer(currentVideoId);
        }
    }, [currentVideoId]);

    const loadPlayer = (videoId) => {
        // Use a unique ID for each player
        const playerId = 'coverPlayer';
        if (window.YT && window.YT.Player) {
            createPlayer(playerId, videoId);
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

    const createPlayer = (playerId, videoId) => {
        const newPlayer = new window.YT.Player(playerId, {
            height: '300',
            width: '500.11',
            videoId: videoId,
            playerVars: {
                autoplay: 1,
                controls: 1,
            },
            events: {
                onReady: (event) => {
                    // Use the player reference passed from the parent
                    player.current = event.target;
                },
            },
        });
    };

    return (
        <div className='youtube'>
            <div id="coverPlayer"> {/* Use a unique ID for each player */}
                    <YouTube
                        videoId={currentVideoId}
                        opts={{
                            height: '300',
                            width: '500.11 ',
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
