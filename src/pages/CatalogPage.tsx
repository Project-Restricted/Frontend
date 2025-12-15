import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { API_CONFIG } from '../config/constants';
import type { FilmPreview } from '../types/film';
import type { LoginRequest, RegisterRequest, User } from '../types/user';

export const CatalogPage = () => {
  const navigate = useNavigate();
  const [films, setFilms] = useState<FilmPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<'login' | 'register'>('login');
  const [isAddFilmModalOpen, setIsAddFilmModalOpen] = useState(false);
  
  const observer = useRef<IntersectionObserver | null>(null);
  const lastFilmElementRef = useRef<HTMLDivElement>(null);
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    const token = localStorage.getItem('access_token');
    
    if (savedUser && token) {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        return null;
      }
    }
    return null;
  });

  const loadMovies = async (page: number = 1, search?: string, genres?: string[], isLoadMore: boolean = false) => {
    try {
      if (isLoadMore) {
        setIsLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      const searchParam = search?.trim();
      const genresParam = genres;
      
      const response = await moviesApi.getMovies(page, searchParam, genresParam);
      
      const newFilms = response.films || [];
      
      if (page === 1) {
        setFilms(newFilms);
      } else {
        setFilms(prev => [...prev, ...newFilms]);
      }
      
      setHasMore(response.hasMore);
      setCurrentPage(page);
      
    } catch (err) {
      setError('Не удалось загрузить фильмы с сервера');
      if (!isLoadMore) {
        setFilms([]);
      }
    } finally {
      if (isLoadMore) {
        setIsLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };
 
  useEffect(() => {
    loadMovies(1);
  }, []);

  useEffect(() => {
    if (isLoadingMore || !hasMore) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }
    
    observer.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMovies(currentPage + 1, searchInput, selectedGenres, true);
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
      }
    );
    
    if (lastFilmElementRef.current) {
      observer.current.observe(lastFilmElementRef.current);
    }
    
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isLoadingMore, hasMore, currentPage, searchInput, selectedGenres]);

  const handleSearchSubmit = () => {
    setCurrentPage(1);
    loadMovies(1, searchInput, selectedGenres);
  };

  const handleGenresChange = (genres: string[]) => {
    setSelectedGenres(genres);
    setCurrentPage(1);
    loadMovies(1, searchInput, genres);
  };

  const handleAddMovie = () => {
    if (!currentUser) {
      alert('Для добавления фильма необходимо войти в систему');
      setAuthModalType('login');
      setAuthModalOpen(true);
      return;
    }
    
    if (!currentUser.isModerator) {
      alert('Только модераторы могут добавлять фильмы');
      const requestModerator = confirm('Хотите запросить роль модератора?');
      if (requestModerator) {
        console.log('Запрос роли модератора');
      }
      return;
    }
    
    setIsAddFilmModalOpen(true);
  };

  const handleAddFilmSubmit = async (formData: FormData) => {
    try {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        alert('Для добавления фильма необходимо войти в систему');
        return;
      }
      
      const response = await fetch(`${API_CONFIG.BASE_URL}/movies/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.message || `Ошибка ${response.status}`);
        } catch (e) {
          throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
      }
      
      await response.json();
      
      setIsAddFilmModalOpen(false);
      
      setCurrentPage(1);
      loadMovies(1, searchInput, selectedGenres);
      
      alert('Фильм успешно добавлен!');
    } catch (error: any) {
      console.error('Ошибка при добавлении фильма:', error);
      
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        alert('Необходимо авторизоваться');
      } else if (error.message.includes('403') || error.message.includes('Forbidden')) {
        alert('Только модераторы могут добавлять фильмы');
      } else {
        alert(`Ошибка: ${error.message}`);
      }
    }
  };

  const handleLogin = async (data: LoginRequest) => {
    try {
      const response = await authApi.login(data);
      
      if (response.success && response.tokens && response.user) {        
        localStorage.setItem('access_token', response.tokens.access);
        localStorage.setItem('refresh_token', response.tokens.refresh);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
                
        setCurrentUser(response.user);
        setAuthModalOpen(false);
      } else {
        alert(response.error || 'Ошибка входа');
      }
    } catch (error) {
      alert('Ошибка соединения с сервером');
    }
  };

  const handleRegister = async (data: RegisterRequest) => {
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
          localStorage.setItem('currentUser', JSON.stringify(loginResponse.user));
          
          setCurrentUser(loginResponse.user);
          setAuthModalOpen(false);
        }
      } else {
        alert(response.error || 'Ошибка регистрации');
      }
    } catch (error) {
      alert('Ошибка соединения с сервером');
    }
  };    

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (refreshToken) {
        await authApi.logout({ refresh: refreshToken });
      }
    } catch (error) {
      console.error('Ошибка при выходе:', error);      
    } finally {      
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
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
        onGenresChange={handleGenresChange}
        searchQuery={searchInput}
        onSearchChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
        onAddMovie={handleAddMovie}
      />
      
      <Container 
        component="main" 
        sx={{ 
          minHeight: 'calc(100vh - 200px)',
          py: 4,
          position: 'relative'
        }}
      >
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              zIndex: 10
            }}
          >
            <CircularProgress />
          </Box>
        )}        

        {error && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 4,
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            opacity: loading ? 0.3 : 1,
            transition: 'opacity 0.3s ease',
            pointerEvents: loading ? 'none' : 'auto'
          }}
        >
          {films.map((film, index) => {
            const isLastElement = index === films.length - 1;
            return (
              <div 
                key={film.id}
                ref={isLastElement ? lastFilmElementRef : null}
              >
                <MovieCard 
                  film={film}
                />
              </div>
            );
          })}
        </Box>

        {!loading && films.length === 0 && (
          <Box textAlign="center" py={4}>
            <Alert severity="info">
              Фильмы не найдены. Попробуйте изменить параметры поиска.
            </Alert>
          </Box>
        )}
        
        {isLoadingMore && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
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