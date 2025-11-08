import { Box, CircularProgress, Typography } from '@mui/material';
import { videoPlayerStyles } from './VideoPlayer.styles';

export const VideoLoader = () => {
  return (
    <Box sx={videoPlayerStyles.loadingOverlay}>
      <CircularProgress sx={{ color: 'primary.main' }} />
      <Typography variant="body2" color="white" sx={{ ml: 2 }}>
        Загрузка...
      </Typography>
    </Box>
  );
};