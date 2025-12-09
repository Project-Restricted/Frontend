import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  CircularProgress, 
  Alert,
  Modal 
} from '@mui/material';
import { Header } from '../components/Header/Header';
import { CatalogFilters } from '../components/CatalogFilters/CatalogFilters';
import { MovieCard } from '../components/MovieCard/MovieCard';
import { AuthModal } from '../components/AuthModal/AuthModal';
import { AddFilmModal } from '../components/AddFilmModal';
import { moviesApi } from '../api/movies';
import { authApi } from '../api';
import { mockFilms } from '../data';
import type { FilmPreview } from '../types/film';
import type { FilmSubmission } from '../types/moderation';
import type { LoginRequest, RegisterRequest, User } from '../types/user';

export const CatalogPage = () => {
  const [films, setFilms] = useState<FilmPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
   
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<'login' | 'register'>('login');
  const [isAddFilmModalOpen, setIsAddFilmModalOpen] = useState(false);
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
 
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await moviesApi.getMovies();
        setFilms(response.films);
        
      } catch (err) {
        console.error('Ошибка загрузки с бэкенда:', err);
        setError('Не удалось загрузить фильмы с сервера');
               
        setFilms(mockFilms);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const filteredFilms = films.filter(film => {
    const matchesSearch = film.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenres = selectedGenres.length === 0 || 
      film.genres.some(genre => selectedGenres.includes(genre));
    
    return matchesSearch && matchesGenres;
  });

  const handleAddMovie = () => {
    setIsAddFilmModalOpen(true);
  };

  const handleAddFilmSubmit = async (filmData: Omit<FilmSubmission, 'id'>) => {
    console.log('Отправка фильма на модерацию:', filmData);

    const newFilmPreview: FilmPreview = {
      id: Date.now(),
      title: filmData.title,
      posterUrl: filmData.posterUrl || 'https://via.placeholder.com/300x450?text=No+Poster',
      year: filmData.year,
      duration: filmData.duration,
      genres: filmData.genres,
      rating: 0,
    };
    
    setFilms(prev => [newFilmPreview, ...prev]);
    setIsAddFilmModalOpen(false);
       
    alert('Фильм отправлен на модерацию! (демо)');
  };

  const handleLogin = async (data: LoginRequest) => {
    console.log('Отправка логина на сервер:', data);
    
    try {
      const response = await authApi.login(data);
      
      if (response.success && response.tokens && response.user) {        
        localStorage.setItem('access_token', response.tokens.access);
        localStorage.setItem('refresh_token', response.tokens.refresh);
                
        setCurrentUser(response.user);
        setAuthModalOpen(false);
        
        console.log('✅ Успешный логин:', response.user);
      } else {
        console.error('❌ Ошибка логина:', response.error);
        alert(response.error || 'Ошибка входа');
      }
    } catch (error) {
      console.error('❌ Ошибка сети при логине:', error);
      alert('Ошибка соединения с сервером');
    }
  };

  const handleRegister = async (data: RegisterRequest) => {
    console.log('Отправка регистрации на сервер:', data);
    
    try {
      const response = await authApi.register(data);
      
      if (response.success && response.user) {        
        const loginResponse = await authApi.login({
          username: data.username,
          password: data.password
        });
        
        if (loginResponse.success && loginResponse.tokens && loginResponse.user) {
          localStorage.setItem('access_token', loginResponse.tokens.access);
          localStorage.setItem('refresh_token', loginResponse.tokens.refresh);
          setCurrentUser(loginResponse.user);
          setAuthModalOpen(false);
          
          console.log('✅ Успешная регистрация и логин:', loginResponse.user);
        }
      } else {
        console.error('❌ Ошибка регистрации:', response.error);
        alert(response.error || 'Ошибка регистрации');
      }
    } catch (error) {
      console.error('❌ Ошибка сети при регистрации:', error);
      alert('Ошибка соединения с сервером');
    }
  };    

  const handleLogout = async () => {
    console.log('Выход из системы');
    
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (refreshToken) {
        await authApi.logout({ refresh: refreshToken });
        console.log('✅ Успешный выход с сервера');
      }
    } catch (error) {
      console.error('❌ Ошибка при выходе:', error);      
    } finally {      
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setCurrentUser(null);
      console.log('✅ Токены удалены из localStorage');
    }
  };

  const handleProfileClick = () => {
    console.log('Переход в профиль');
  };

  return (
    <>
      <Header 
        currentUser={currentUser}
        onLoginClick={() => {
          setAuthModalType('login');
          setAuthModalOpen(true);
        }}
        onRegisterClick={() => {
          setAuthModalType('register');
          setAuthModalOpen(true);
        }}
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
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {error} (используются демо-данные)
          </Alert>
        )}

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
          {filteredFilms.map((film) => (
            <MovieCard 
              key={film.id}
              film={film}
            />
          ))}
        </Box>

        {!loading && filteredFilms.length === 0 && (
          <Box textAlign="center" py={4}>
            <Alert severity="info">
              Фильмы не найдены. Попробуйте изменить параметры поиска.
            </Alert>
          </Box>
        )}
      </Container>
      
      <AuthModal
        open={authModalOpen}
        type={authModalType}
        onClose={() => setAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
      
      <Modal
        open={isAddFilmModalOpen}
        onClose={() => setIsAddFilmModalOpen(false)}
        aria-labelledby="add-film-modal"
        aria-describedby="modal-for-adding-new-film"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          backdropFilter: 'blur(5px)',
        }}
      >        
        <Box onClick={(e) => e.stopPropagation()}>
          <AddFilmModal
            onClose={() => setIsAddFilmModalOpen(false)}
            onSubmit={handleAddFilmSubmit}
          />
        </Box>
      </Modal>
    </>
  );
};