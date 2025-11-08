import { Box, Typography, IconButton } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { videoPlayerStyles } from './VideoPlayer.styles';

interface VideoControlsProps {
  hasUserInteracted: boolean;
  isPlaying: boolean;
  isLoading: boolean;
  onPlay: () => void;
}

export const VideoControls = ({ 
  hasUserInteracted, 
  isPlaying, 
  isLoading, 
  onPlay 
}: VideoControlsProps) => {
  if (isLoading) return null;
  if (isPlaying) return null;

  const overlayStyle = hasUserInteracted 
    ? { background: 'rgba(0, 0, 0, 0.3)' }
    : { background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' };

  return (
    <Box sx={[videoPlayerStyles.overlay, overlayStyle]} onClick={onPlay}>
      {!hasUserInteracted && (
        <Typography variant="h6" color="rgba(255,255,255,0.7)" textAlign="center">
          Нажмите для начала просмотра
        </Typography>
      )}
      <IconButton sx={videoPlayerStyles.playButton}>
        <PlayArrow sx={{ color: 'black', fontSize: 40 }} />
      </IconButton>
    </Box>
  );
};