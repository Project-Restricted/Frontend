import { Box, Typography, Chip } from '@mui/material';
import { filmInfoStyles } from './FilmInfo.styles';

interface FilmHeaderProps {
  title: string;
  genres: string[];
}

export const FilmHeader = ({ title, genres }: FilmHeaderProps) => {
  return (
    <>
      <Typography variant="h2" gutterBottom sx={filmInfoStyles.title}>
        {title}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
        {genres.map((genre, index) => (
          <Chip 
            key={index}
            label={genre} 
            sx={filmInfoStyles.genreChip} 
          />
        ))}
      </Box>
    </>
  );
};