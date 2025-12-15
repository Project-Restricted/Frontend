import { useState, useEffect } from 'react';
import { Box, Chip, CircularProgress, Alert } from '@mui/material';
import { catalogFiltersStyles } from './CatalogFilters.styles';
import { API_CONFIG, ENDPOINTS } from '../../config/constants';

interface Genre {
  id: number;
  name: string;
}

interface GenreFilterProps {
  selectedGenres: string[];
  onGenresChange: (genres: string[]) => void;
}

export const GenreFilter = ({ selectedGenres, onGenresChange }: GenreFilterProps) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_CONFIG.BASE_URL}${ENDPOINTS.MOVIE_GENRES}`);
        
        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
        
        const data: Genre[] = await response.json();
        setGenres(data);
      } catch (err: any) {
        setError(err.message || 'Не удалось загрузить жанры');
        
        const demoGenres: Genre[] = [
          { id: 1, name: "Боевик" },
          { id: 2, name: "Драма" },
          { id: 3, name: "Комедия" },
          { id: 4, name: "Фантастика" },
          { id: 5, name: "Ужасы" },
          { id: 6, name: "Триллер" },
          { id: 7, name: "Мелодрама" },
          { id: 8, name: "Детектив" },
          { id: 9, name: "Приключения" },
          { id: 10, name: "Фэнтези" },
          { id: 11, name: "Мультфильм" }
        ];
        
        setGenres(demoGenres);
      } finally {
        setLoading(false);
      }
    };

    loadGenres();
  }, []);

  const handleGenreClick = (genreId: string) => {    
    const newGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter(id => id !== genreId)
      : [...selectedGenres, genreId];
    onGenresChange(newGenres);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error && genres.length === 0) {
    return (
      <Alert severity="warning" sx={{ mb: 2 }}>
        {error} (используются демо-данные)
      </Alert>
    );
  }

  return (
    <>
      {error && (
        <Alert severity="info" sx={{ mb: 2, fontSize: '0.8rem' }}>
          ⚠️ {error} (используются демо-жанры)
        </Alert>
      )}
      
      <Box sx={catalogFiltersStyles.genresContainer}>
        {genres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            clickable
            variant={selectedGenres.includes(genre.id.toString()) ? "filled" : "outlined"}
            onClick={() => handleGenreClick(genre.id.toString())}
            sx={{
              ...catalogFiltersStyles.chip,
              fontWeight: selectedGenres.includes(genre.id.toString()) ? 600 : 400,
              bgcolor: selectedGenres.includes(genre.id.toString()) ? 'white' : '#000000',
              color: selectedGenres.includes(genre.id.toString()) ? 'black' : 'white',
              '&:hover': {
                ...catalogFiltersStyles.chip['&:hover'],
                bgcolor: selectedGenres.includes(genre.id.toString()) ? 'grey.300' : 'grey.800',
              }
            }}
          />
        ))}
      </Box>
    </>
  );
};