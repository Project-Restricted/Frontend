import { Box, Typography, Button } from '@mui/material';
import { Star } from '@mui/icons-material';
import { filmInfoStyles } from './FilmInfo.styles';

interface FilmRatingProps {
  rating: number;
  onRateClick: () => void;
}

export const FilmRating = ({ rating, onRateClick }: FilmRatingProps) => {
  return (
    <Box sx={filmInfoStyles.ratingSection}>
      <Box sx={filmInfoStyles.ratingItem}>
        <Star sx={{ color: '#fbbf24', fontSize: '2rem' }} />
        <Typography variant="h6" color="white">
          <strong>Рейтинг:</strong> {rating}/10
        </Typography>
      </Box>

      <Box sx={filmInfoStyles.ratingItem}>
        <Star sx={{ color: 'primary.main', fontSize: '2rem' }} />
        <Typography variant="h6" color="white">
          <strong>Ваша оценка:</strong>
        </Typography>
        <Button
          variant="outlined"
          onClick={onRateClick}
          sx={filmInfoStyles.ratingButton}
        >
          Оценить
        </Button>
      </Box>
    </Box>
  );
};