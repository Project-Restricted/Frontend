import { useState, useEffect, useCallback, useRef } from 'react';
import { Container, Button, Box, CircularProgress, Alert } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { FilmInfo } from '../components/FilmInfo/FilmInfo';
import { VideoPlayer } from '../components/VideoPlayer/VideoPlayer';
import { CommentsSection } from '../components/CommentsSection/CommentsSection';
import { AddTagModal } from '../components/FilmInfo/AddTagModal';
import { RateFilmModal } from '../components/FilmInfo/RateFilmModal';
import { moviesApi } from '../api/movies';
import type { FilmDetails, Review, RateFilmResponse } from '../types/film';
import { API_CONFIG, ENDPOINTS } from '../config/constants';

export const FilmPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [filmData, setFilmData] = useState<FilmDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  
  const [reviewsPage, setReviewsPage] = useState(1);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [hasMoreReviews, setHasMoreReviews] = useState(false);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  
  const observer = useRef<IntersectionObserver | null>(null);
  const lastReviewElementRef = useRef<HTMLDivElement>(null);
  
  const [currentUserId, setCurrentUserId] = useState<number | undefined>(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        return user.id;
      } catch {
        return undefined;
      }
    }
    return undefined;
  });

  useEffect(() => {
    const loadFilm = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await moviesApi.getMovieDetails(parseInt(id), 5);
        
        setFilmData(data);
        
        const initialReviews = data.reviews || [];
        setAllReviews(initialReviews);
        
        if (initialReviews.length >= 5) {
          setHasMoreReviews(true);
        }
        
        await loadUserRating();
        
      } catch (err) {
        console.error('Ошибка загрузки фильма:', err);
        setError('Не удалось загрузить фильм с сервера');
      } finally {
        setLoading(false);
      }
    };

    loadFilm();
  }, [id]);

  const loadMoreReviews = useCallback(async (page: number) => {
    if (!id || reviewsLoading || !hasMoreReviews) return;
    
    try {
      setReviewsLoading(true);
      
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${ENDPOINTS.MOVIE_REVIEWS(parseInt(id))}?page=${page}&page_size=10`
      );
      
      if (!response.ok) {
        throw new Error(`Ошибка загрузки отзывов: ${response.status}`);
      }
      
      const responseData = await response.json();
      
      const results = responseData.reviews || responseData.results || [];
      const hasMore = responseData.hasMore || !!responseData.next;
      
      if (results.length === 0) {
        setHasMoreReviews(false);
        return;
      }
      
      const existingIds = new Set(allReviews.map(review => review.id));
      const newReviews = results.filter((review: Review) => !existingIds.has(review.id));
      
      if (newReviews.length > 0) {
        setAllReviews(prev => [...prev, ...newReviews]);
      } else {
        setHasMoreReviews(false);
      }
      
      setHasMoreReviews(hasMore);
      setReviewsPage(page);
      
    } catch (err) {
      console.error('Ошибка загрузки отзывов:', err);
      setHasMoreReviews(false);
    } finally {
      setReviewsLoading(false);
    }
  }, [id, reviewsLoading, hasMoreReviews, allReviews]);

  useEffect(() => {
    if (reviewsLoading || !hasMoreReviews) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }
    
    observer.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMoreReviews && !reviewsLoading) {
          loadMoreReviews(reviewsPage + 1);
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
      }
    );
    
    if (lastReviewElementRef.current) {
      observer.current.observe(lastReviewElementRef.current);
    }
    
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loadMoreReviews, hasMoreReviews, reviewsLoading, reviewsPage]);

  const loadUserRating = async () => {
    if (!id) return;
    
    try {
      if (!currentUserId) {
        setUserRating(null);
        return;
      }

      const allUserRatings = JSON.parse(localStorage.getItem('allUserRatings') || '{}');
      
      const userRatings = allUserRatings[currentUserId];
      
      if (userRatings && userRatings[id]) {
        setUserRating(userRatings[id]);
      } else {
        setUserRating(null);
      }
      
    } catch (err) {
      console.error('Ошибка загрузки оценки пользователя:', err);
      setUserRating(null);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const handleAddComment = async (text: string) => {
    if (!id || !filmData) return;
    
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      alert('Для добавления отзыва нужно войти в систему');
      return;
    }
    
    try {
      const createReviewUrl = `${API_CONFIG.BASE_URL}${ENDPOINTS.REVIEW_CREATE}`;
      
      const response = await fetch(createReviewUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movie: parseInt(id),
          text: text
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.detail || errorData.message || `Ошибка ${response.status}`);
        } catch (e) {
          throw new Error(`Ошибка ${response.status}: ${errorText.substring(0, 100)}`);
        }
      }
      
      const serverResponse = await response.json();
      
      if (!serverResponse || typeof serverResponse !== 'object') {
        throw new Error('Неверный формат ответа сервера');
      }
      
      const newReview: Review = {
        id: serverResponse.id,
        text: serverResponse.text,
        createdAt: serverResponse.createdAt,
        likes: serverResponse.likes || 0,
        likedByCurrentUser: serverResponse.likedByCurrentUser || false,
        user: {
          id: serverResponse.user?.id || 0,
          username: serverResponse.user?.username || 'Аноним',
          avatarUrl: serverResponse.user?.avatarUrl || null
        }
      };
      
      if (!newReview.id || !newReview.text) {
        alert('Ошибка: получены неполные данные отзыва');
        return;
      }
      
      setAllReviews(prev => [newReview, ...prev]);
      
    } catch (err: any) {
      console.error('Ошибка при создании отзыва:', err);
      
      let errorMessage = 'Не удалось добавить отзыв';
      
      if (err.status === 401) {
        errorMessage = 'Ошибка авторизации. Возможно, токен истёк. Войдите заново.';
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('currentUser');
        
        const userIdToRemove = currentUserId;
        setCurrentUserId(undefined);
        setUserRating(null);
        
        if (userIdToRemove) {
          const allUserRatings = JSON.parse(localStorage.getItem('allUserRatings') || '{}');
          delete allUserRatings[userIdToRemove];
          localStorage.setItem('allUserRatings', JSON.stringify(allUserRatings));
        }
      } else if (err.status === 400) {
        errorMessage = 'Неверные данные. Проверьте текст отзыва.';
      } else if (err.status === 403) {
        errorMessage = 'У вас нет прав для создания отзывов';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      alert(`❌ ${errorMessage}`);
    }
  };

  const handleLikeComment = async (commentId: number) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert('Для оценки отзывов нужно войти в систему');
        return;
      }
      
      const likeUrl = `${API_CONFIG.BASE_URL}${ENDPOINTS.REVIEW_LIKE(commentId)}`;
      
      const response = await fetch(likeUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Ошибка лайка: ${response.status}`);
      }
      
      const result = await response.json();
      
      setAllReviews(prev =>
        prev.map(review =>
          review.id === commentId 
            ? { 
                ...review, 
                likes: result.likes,
                likedByCurrentUser: result.likedByCurrentUser
              }
            : review
        )
      );
      
    } catch (err: any) {
      console.error('Ошибка при лайке:', err);
      alert(err.message || 'Ошибка при оценке отзыва');
    }
  };

  const handleAddTag = async (tagName: string) => {
    setFilmData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        tags: [...prev.tags, tagName]
      };
    });
    
    await new Promise(resolve => setTimeout(resolve, 500));
  };
  
  const handleRateFilm = async (rating: number) => {
    if (!id || !filmData) {
      console.error('ID фильма не найден или данные не загружены');
      return;
    }
    
    if (rating < 1 || rating > 10) {
      alert('Оценка должна быть от 1 до 10');
      return;
    }
    
    const intRating = Math.round(rating);
    if (intRating !== rating) {
      alert('Оценка должна быть целым числом');
      return;
    }
    
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      alert('Для оценки фильма нужно войти в систему');
      return;
    }

    try {
      const rateUrl = `${API_CONFIG.BASE_URL}${ENDPOINTS.MOVIE_RATE(parseInt(id))}`;

      const requestBody = {
        score: intRating
      };

      const response = await fetch(rateUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const contentType = response.headers.get('content-type');
      if (contentType && !contentType.includes('application/json')) {
        throw new Error('Сервер вернул некорректный формат');
      }

      if (!response.ok) {
        await response.text();
        let errorMessage = `Ошибка ${response.status}`;
        
        if (response.status === 500) {
          errorMessage = 'Внутренняя ошибка сервера. Используется демо-режим.';
          throw new Error(errorMessage);
        }
        
        throw new Error(errorMessage);
      }

      const result: RateFilmResponse = await response.json();

      setFilmData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          rating: parseFloat(result.rating.toFixed(1))
        };
      });

      setUserRating(intRating);
      
      if (currentUserId) {
        const allUserRatings = JSON.parse(localStorage.getItem('allUserRatings') || '{}');
        const userRatings = allUserRatings[currentUserId] || {};
        userRatings[id] = intRating;
        allUserRatings[currentUserId] = userRatings;
        localStorage.setItem('allUserRatings', JSON.stringify(allUserRatings));
      }

      alert(`Вы оценили фильм "${filmData.title}" на ${intRating}/10`);
      
    } catch (err: any) {
      console.error('Ошибка при оценке фильма:', err);
      
      const mockRating = Math.round(rating);
      const newAverageRating = (filmData.rating + mockRating) / 2;
      
      setFilmData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          rating: parseFloat(newAverageRating.toFixed(1))
        };
      });
      
      setUserRating(mockRating);
      
      if (currentUserId) {
        const allUserRatings = JSON.parse(localStorage.getItem('allUserRatings') || '{}');
        const userRatings = allUserRatings[currentUserId] || {};
        userRatings[id] = mockRating;
        allUserRatings[currentUserId] = userRatings;
        localStorage.setItem('allUserRatings', JSON.stringify(allUserRatings));
      }
      
      alert(`[ДЕМО-РЕЖИМ] Вы оценили фильм "${filmData.title}" на ${mockRating}/10`);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !filmData) {
    return (
      <Container>
        <Alert severity="warning" sx={{ mt: 4 }}>
          {error || 'Фильм не найден'}
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'black', 
      color: 'white',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      py: 4
    }}>
      <Container 
        maxWidth="lg" 
        sx={{ 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Button 
          startIcon={<ArrowBack />} 
          onClick={handleBackClick}
          sx={{ 
            color: 'white', 
            mb: 4,
            border: '1px solid #ffffff',
            minWidth: '180px',
            alignSelf: 'flex-start',
            '&:hover': {
              border: '1px solid rgba(255,255,255,0.6)',
              bgcolor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          Назад к каталогу
        </Button>

        <FilmInfo 
          film={filmData}
          onAddTagClick={() => setIsAddTagModalOpen(true)}
          onRateClick={() => setIsRateModalOpen(true)}
          userRating={userRating}
        />
        
        <VideoPlayer videoUrl={filmData.videoUrl} />
        
        <CommentsSection
          reviews={allReviews}
          currentUserId={currentUserId}
          onAddComment={handleAddComment}
          onLikeComment={handleLikeComment}
        />
        
        <div ref={lastReviewElementRef} style={{ height: '20px', marginTop: '20px', width: '100%' }}>
          {reviewsLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress size={24} sx={{ color: 'white' }} />
            </Box>
          )}
        </div>
      </Container>

      <AddTagModal
        open={isAddTagModalOpen}
        onClose={() => setIsAddTagModalOpen(false)}
        onSubmit={handleAddTag}
        existingTags={filmData.tags}
      />
    
      <RateFilmModal
        open={isRateModalOpen}
        onClose={() => setIsRateModalOpen(false)}
        onSubmit={handleRateFilm}
        filmTitle={filmData.title}
        userRating={userRating}
      />
    </Box>
  );
};