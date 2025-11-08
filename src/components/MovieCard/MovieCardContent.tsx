import { CardContent, Typography, Box, Chip } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import { movieCardStyles } from './MovieCard.styles';

interface MovieCardContentProps {
  title: string;
  year: number;
  duration: number;
  genres: string[];
}

export const MovieCardContent = ({ title, year, duration, genres }: MovieCardContentProps) => {
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}ч ${mins}мин`;
  };

  return (
    <CardContent sx={movieCardStyles.cardContent}>
      <Typography 
        variant="h6" 
        component="h3" 
        fontSize="1rem"
        color="white"
        sx={movieCardStyles.title}
      >
        {title}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        <Chip 
          label={genres[0]}
          size="small"
          variant="outlined"
          sx={movieCardStyles.genreChip}
        />
        <Typography variant="body2" color="white" fontSize="0.75rem">
          {year}
        </Typography>
      </Box>

      <Box sx={movieCardStyles.durationBox}>
        <AccessTime sx={{ fontSize: 16, color: 'white', opacity: 0.7 }} />
        <Typography variant="body2" color="white" fontSize="0.75rem">
          {formatDuration(duration)}
        </Typography>
      </Box>
    </CardContent>
  );
};