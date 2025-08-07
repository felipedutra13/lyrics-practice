import { useEffect, useRef } from 'react'

function VideoPlayer() {
  const playerRef = useRef(null);
  const youtubePlayer = useRef(null);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    // This function gets called by the YouTube API
    window.onYouTubeIframeAPIReady = () => {
      youtubePlayer.current = new window.YT.Player(playerRef.current, {
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

    const handleKeyDown = (event) => {
      if (!youtubePlayer.current) return;

      const currentTime = youtubePlayer.current.getCurrentTime();

      switch (event.key) {
        case '<': // Retroceder 5 segundos
          youtubePlayer.current.seekTo(currentTime - 5, true);
          break;
        case '>': // Avançar 5 segundos
          youtubePlayer.current.seekTo(currentTime + 5, true);
          break;
        case ' ': // Pausar/Reproduzir
          const playerState = youtubePlayer.current.getPlayerState();
          if (playerState === window.YT.PlayerState.PLAYING || playerState === window.YT.PlayerState.BUFFERING) {
            youtubePlayer.current.pauseVideo();
          } else {
            youtubePlayer.current.playVideo();
          }
          break;
        case 'ArrowUp': // Aumentar volume
          let currentVolumeUp = youtubePlayer.current.getVolume();
          if (currentVolumeUp < 100) {
            youtubePlayer.current.setVolume(Math.min(currentVolumeUp + 5, 100));
          }
          break;
        case 'ArrowDown': // Diminuir volume
          let currentVolumeDown = youtubePlayer.current.getVolume();
          if (currentVolumeDown > 0) {
            youtubePlayer.current.setVolume(Math.max(currentVolumeDown - 5, 0));
          }
          break;
        case 'm': // Mudo/Desmudo
            if (youtubePlayer.current.isMuted()) {
                youtubePlayer.current.unMute();
            } else {
                youtubePlayer.current.mute();
            }
            break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      delete window.onYouTubeIframeAPIReady;
      document.removeEventListener('keydown', handleKeyDown);
      if (youtubePlayer.current) {
        youtubePlayer.current.destroy();
      }
    };
  }, []);

  return <div ref={playerRef}></div>;
};

export default VideoPlayer;

