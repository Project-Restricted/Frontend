import { Box, Typography, Button } from '@mui/material';
import { Star } from '@mui/icons-material';
import { filmInfoStyles } from './FilmInfo.styles';

interface FilmRatingProps {
  rating: number;
  onRateClick: () => void;
  userRating?: number | null;
}

export const FilmRating = ({ rating, onRateClick, userRating }: FilmRatingProps) => {
  return (
    <Box sx={filmInfoStyles.ratingSection}>
      <Box sx={filmInfoStyles.ratingItem}>
        <Star sx={{ color: '#fbbf24', fontSize: '2rem' }} />
        <Typography variant="h6" color="white">
          <strong>Рейтинг:</strong> {rating.toFixed(1)}/10
        </Typography>
      </Box>

      <Box sx={filmInfoStyles.ratingItem}>
        <Star sx={{ 
          color: userRating ? '#fbbf24' : 'primary.main', 
          fontSize: '2rem' 
        }} />
        
        <Typography variant="h6" color="white">
          <strong>Ваша оценка:</strong>
          {userRating && (
            <span style={{ marginLeft: '8px', color: 'white' }}>
              {userRating}/10
            </span>
          )}
        </Typography>
        
        <Button
          variant="outlined"
          onClick={onRateClick}
          sx={filmInfoStyles.ratingButton}
        >
          {userRating ? 'Изменить' : 'Оценить'}
        </Button>
      </Box>
    </Box>
  );
};