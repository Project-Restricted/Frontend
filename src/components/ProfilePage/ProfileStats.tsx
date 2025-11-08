import { Box, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import { profileStyles } from './Profile.styles';

interface ProfileStatsProps {
  reviewsCount: number;
  averageRating: number;
}

export const ProfileStats = ({ reviewsCount, averageRating }: ProfileStatsProps) => {
  const getReviewsText = (count: number) => {
    if (count % 10 === 1 && count % 100 !== 11) return 'комментарий';
    if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return 'комментария';
    return 'комментариев';
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={profileStyles.sectionTitle}>
        Статистика
      </Typography>
      <Box sx={profileStyles.statsContainer}>
        <Box sx={profileStyles.statItem}>
          <Typography variant="h3" sx={profileStyles.statValue}>
            {reviewsCount}
          </Typography>
          <Typography variant="h6" color="white" sx={{ mt: 1 }}>
            {getReviewsText(reviewsCount)}
          </Typography>
        </Box>
        
        <Box sx={profileStyles.statItem}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Star sx={{ color: '#fbbf24', fontSize: '2rem' }} />
            <Typography variant="h3" sx={profileStyles.ratingValue}>
              {averageRating}
            </Typography>
          </Box>
          <Typography variant="h6" color="white" sx={{ mt: 1 }}>
            Средняя оценка
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};