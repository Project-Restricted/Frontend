import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { Header } from '../components/Header/Header';
import { CatalogFilters } from '../components/CatalogFilters/CatalogFilters';
import { MovieCard } from '../components/MovieCard/MovieCard';
import { AuthModal } from '../components/AuthModal/AuthModal';
import { mockFilms } from '../data';
import type { LoginRequest, RegisterRequest, User } from '../types/user';

export const CatalogPage = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleAddMovie = () => {
    console.log('Добавить фильм');
  };

  const handleLogin = (data: LoginRequest) => {
    console.log('Логин данные:', data);
  
    setCurrentUser({
      id: 1,
      email: 'user@example.com',
      username: data.username,
      avatarUrl: '',
      averageRating: 4.2,
      reviewsCount: 5,
      isModerator: false,
      createdAt: Date.now()
    });
  };

  const handleRegister = (data: RegisterRequest) => {
    console.log('Регистрация данные:', data);
  
    setCurrentUser({
      id: 2,
      email: data.email,
      username: data.username,
      avatarUrl: '',
      averageRating: 0,
      reviewsCount: 0,
      isModerator: false,
      createdAt: Date.now()
    });
  };

  const handleLogout = () => {
    console.log('Выход');
    setCurrentUser(null);
  };

  const handleProfileClick = () => {
    console.log('Переход в профиль');
  };

  return (
    <>
      <Header 
        currentUser={currentUser}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onRegisterClick={() => setIsRegisterModalOpen(true)}
        onLogoutClick={handleLogout}
        onProfileClick={handleProfileClick}
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
            />
          ))}
        </Box>
      </Container>

      <AuthModal
        open={isLoginModalOpen || isRegisterModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(false);
        }}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </>
  );
};