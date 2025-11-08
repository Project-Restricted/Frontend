import { Box, Typography, Chip } from '@mui/material';
import { Person } from '@mui/icons-material';
import { filmInfoStyles } from './FilmInfo.styles';

interface FilmActorsProps {
  actors: string[];
}

export const FilmActors = ({ actors }: FilmActorsProps) => {
  return (
    <Box sx={filmInfoStyles.actorsSection}>
      <Box sx={filmInfoStyles.actorsHeader}>
        <Person sx={{ color: 'primary.main', fontSize: '1.5rem' }} />
        <Typography variant="h6" sx={filmInfoStyles.actorsTitle}>
          Актерский состав:
        </Typography>
      </Box>
      
      <Box sx={filmInfoStyles.actorsContainer}>
        {actors.map((actor, index) => (
          <Chip
            key={index}
            label={actor}
            variant="outlined"
            sx={filmInfoStyles.actorChip}
          />
        ))}
      </Box>
    </Box>
  );
};