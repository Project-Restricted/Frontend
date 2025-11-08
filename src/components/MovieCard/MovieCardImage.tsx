import { CardMedia, Box, IconButton, Typography } from '@mui/material';
import { PlayArrow, Star } from '@mui/icons-material';
import { movieCardStyles } from './MovieCard.styles';

interface MovieCardImageProps {
  posterUrl: string;
  title: string;
  rating: number;
}

export const MovieCardImage = ({ posterUrl, title, rating }: MovieCardImageProps) => {
  return (
    <Box sx={movieCardStyles.imageContainer}>
      <CardMedia
        component="img"
        image={posterUrl}
        alt={title}
        sx={movieCardStyles.cardMedia}
      />
      
      <Box sx={movieCardStyles.overlay}>
        <IconButton sx={movieCardStyles.playButton} size="large">
          <PlayArrow sx={{ color: 'black', fontSize: 32 }} />
        </IconButton>
      </Box>

      <Box sx={movieCardStyles.ratingBadge}>
        <Star sx={{ color: '#fbbf24', fontSize: 24 }} />
        <Typography variant="body1" color="white" fontSize="1rem" fontWeight="600">
          {rating}
        </Typography>
      </Box>
    </Box>
  );
};