import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { Header } from '../components/Header/Header';
import { CatalogFilters } from '../components/CatalogFilters/CatalogFilters';
import { MovieCard } from '../components/MovieCard/MovieCard';
import { mockFilms } from '../data';

export const CatalogPage = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddMovie = () => {
    console.log('Добавить фильм');
  };

  const handleFilmClick = (filmId: number) => {
    console.log('Переход на страницу фильма:', filmId);
  };

  return (
    <>
      <Header 
        currentUser={null}
        onLoginClick={() => console.log('Вход')}
        onRegisterClick={() => console.log('Регистрация')}
        onLogoutClick={() => console.log('Выход')}
        onProfileClick={() => console.log('Профиль')}
      />
      
      <CatalogFilters
        selectedGenres={selectedGenres}
        onGenresChange={setSelectedGenres}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddMovie={handleAddMovie}
      />
      
      <Container 
        component="main" 
        sx={{ 
          minHeight: 'calc(100vh - 200px)',
          py: 4 
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 4,
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          {mockFilms.map((film) => (
            <MovieCard 
              key={film.id}
              film={film}
              onClick={() => handleFilmClick(film.id)}
            />
          ))}
        </Box>
      </Container>
    </>
  );
};