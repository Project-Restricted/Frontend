import { Paper, Box } from '@mui/material';
import { videoPlayerStyles } from './VideoPlayer.styles';

interface VideoPlayerProps {
  videoUrl: string;
}

export const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  return (
    <Paper sx={videoPlayerStyles.paper}>
      <Box sx={videoPlayerStyles.videoContainer}>
        <Box
          component="iframe"
          src={videoUrl}
          title="Rutube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sx={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '8px'
          }}
        />
      </Box>
    </Paper>
  );
};