import { Box, Typography } from '@mui/material';
import { AccessTime, CalendarToday, Language, Person } from '@mui/icons-material';
import { filmInfoStyles } from './FilmInfo.styles';

interface FilmMetaProps {
  year: number;
  duration: number;
  country: string;
  director: string;
  description: string;
}

export const FilmMeta = ({ year, duration, country, director, description }: FilmMetaProps) => {
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}ч ${mins}мин`;
  };

  return (
    <Box sx={filmInfoStyles.metaSection}>
      <Box sx={filmInfoStyles.metaItem}>
        <CalendarToday sx={{ color: 'primary.main', fontSize: '2rem' }} />
        <Typography variant="h6" color="white">
          <strong>Год выпуска:</strong> {year}
        </Typography>
      </Box>

      <Box sx={filmInfoStyles.metaItem}>
        <AccessTime sx={{ color: 'primary.main', fontSize: '2rem' }} />
        <Typography variant="h6" color="white">
          <strong>Длительность:</strong> {formatDuration(duration)}
        </Typography>
      </Box>

      <Box sx={filmInfoStyles.metaItem}>
        <Language sx={{ color: 'primary.main', fontSize: '2rem' }} />
        <Typography variant="h6" color="white">
          <strong>Страна:</strong> {country}
        </Typography>
      </Box>

      <Box sx={filmInfoStyles.metaItem}>
        <Person sx={{ color: 'primary.main', fontSize: '2rem' }} />
        <Typography variant="h6" color="white">
          <strong>Режиссер:</strong> {director}
        </Typography>
      </Box>

      <Typography variant="body1" sx={filmInfoStyles.description}>
        {description}
      </Typography>
    </Box>
  );
};