import { Paper, Box } from '@mui/material';
import { useState, useRef } from 'react';
import { videoPlayerStyles } from './VideoPlayer.styles';
import { VideoControls } from './VideoControls';
import { VideoLoader } from './VideoLoader';

interface VideoPlayerProps {
  videoUrl: string;
}

export const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = async () => {
    if (videoRef.current) {
      setIsLoading(true);
      setHasUserInteracted(true);
      
      try {
        if (!videoRef.current.src) {
          videoRef.current.src = videoUrl;
        }
        
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Ошибка воспроизведения:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVideoClick = () => {
    if (!isPlaying && !isLoading) {
      handlePlay();
    }
  };

  return (
    <Paper sx={videoPlayerStyles.paper}>
      <Box sx={videoPlayerStyles.videoContainer}>
        <video
          ref={videoRef}
          controls={isPlaying}
          preload="none"
          style={videoPlayerStyles.video}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onWaiting={() => setIsLoading(true)}
          onCanPlay={() => setIsLoading(false)}
          onClick={handleVideoClick}
        >
          <source src={videoUrl} type="video/mp4" />
          Ваш браузер не поддерживает видео тег.
        </video>

        {isLoading && <VideoLoader />}
        
        <VideoControls
          hasUserInteracted={hasUserInteracted}
          isPlaying={isPlaying}
          isLoading={isLoading}
          onPlay={handlePlay}
        />
      </Box>
    </Paper>
  );
};