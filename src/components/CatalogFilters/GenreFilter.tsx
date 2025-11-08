import { Box, Chip } from '@mui/material';
import { catalogFiltersStyles } from './CatalogFilters.styles';
import { ALL_GENRES } from '../../data';

interface GenreFilterProps {
  selectedGenres: string[];
  onGenresChange: (genres: string[]) => void;
}

export const GenreFilter = ({ selectedGenres, onGenresChange }: GenreFilterProps) => {
  const handleGenreClick = (genre: string) => {
    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    onGenresChange(newGenres);
  };

  return (
    <Box sx={catalogFiltersStyles.genresContainer}>
      {ALL_GENRES.map((genre) => (
        <Chip
          key={genre}
          label={genre}
          clickable
          variant={selectedGenres.includes(genre) ? "filled" : "outlined"}
          onClick={() => handleGenreClick(genre)}
          sx={{
            ...catalogFiltersStyles.chip,
            fontWeight: selectedGenres.includes(genre) ? 600 : 400,
            bgcolor: selectedGenres.includes(genre) ? 'white' : '#000000',
            color: selectedGenres.includes(genre) ? 'black' : 'white',
            '&:hover': {
              ...catalogFiltersStyles.chip['&:hover'],
              bgcolor: selectedGenres.includes(genre) ? 'grey.300' : 'grey.800',
            }
          }}
        />
      ))}
    </Box>
  );
};