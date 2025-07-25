import { useEffect, useRef } from 'react'

function VideoPlayer() {
  const playerRef = useRef(null);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    // This function gets called by the YouTube API
    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player(playerRef.current, {
        height: '360',
        width: '640',
        videoId: 'dQw4w9WgXcQ',
        events: {
          onReady: (event) => {
            console.log('Player is ready');
            // event.target.playVideo(); // Uncomment to auto-play
          },
          onStateChange: (event) => {
            console.log('State changed:', event.data);
          },
        },
      });
    };

    // Clean up
    return () => {
      delete window.onYouTubeIframeAPIReady;
    };
  }, []);

  return <div ref={playerRef}></div>;
};

export default VideoPlayer;

