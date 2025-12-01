import { useState } from 'react';
import { Container, Button, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { FilmInfo } from '../components/FilmInfo/FilmInfo';
import { VideoPlayer } from '../components/VideoPlayer/VideoPlayer';
import { CommentsSection } from '../components/CommentsSection/CommentsSection';
import { AddTagModal } from '../components/FilmInfo/AddTagModal';
import { RateFilmModal } from '../components/FilmInfo/RateFilmModal';
import { mockFilmDetails } from '../data';

export const FilmPage = () => {
  const navigate = useNavigate();
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [filmData, setFilmData] = useState(mockFilmDetails);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleAddComment = (text: string) => {
    console.log('Добавить комментарий:', text);
    
    const newComment = {
      id: Date.now(),
      user: {
        id: 1,
        username: 'Алексей',
        avatarUrl: ''
      },
      text: text,
      likes: 0,
      replyOn: 0,
      createdAt: Date.now()
    };
    
    setFilmData(prev => ({
      ...prev,
      reviews: [...prev.reviews, newComment]
    }));
  };

  const handleAddReply = (parentId: number, text: string) => {
    console.log('Добавить ответ:', parentId, text);
    
    const newReply = {
      id: Date.now(),
      user: {
        id: 1,
        username: 'Алексей',
        avatarUrl: ''
      },
      text: text,
      likes: 0,
      replyOn: parentId,
      createdAt: Date.now()
    };
    
    setFilmData(prev => ({
      ...prev,
      reviews: [...prev.reviews, newReply]
    }));
  };

  const handleLikeComment = (commentId: number) => {
    console.log('Лайк комментария:', commentId);
    
    setFilmData(prev => ({
      ...prev,
      reviews: prev.reviews.map(review =>
        review.id === commentId 
          ? { ...review, likes: review.likes + 1 }
          : review
      )
    }));
  };

  const handleDeleteComment = (commentId: number) => {
    console.log('Удалить комментарий:', commentId);
    
    setFilmData(prev => ({
      ...prev,
      reviews: prev.reviews.filter(review => review.id !== commentId)
    }));
  };

  const handleEditComment = async (commentId: number, text: string) => {
    console.log('Редактирование комментария:', commentId, text);
      
    await new Promise(resolve => setTimeout(resolve, 500));
        
    setFilmData(prev => ({
      ...prev,
      reviews: prev.reviews.map(review =>
        review.id === commentId 
          ? { 
              ...review, 
              text: text,
              updatedAt: Date.now()
            } 
          : review
      )
    }));
  };
  
  const handleAddTag = async (tagName: string) => {
    console.log('Добавление тега к фильму:', tagName);
    
    setFilmData(prev => ({
      ...prev,
      tags: [...prev.tags, tagName]
    }));
    
    await new Promise(resolve => setTimeout(resolve, 500));
  };
  
  const handleRateFilm = async (rating: number) => {
    console.log('Оценка фильма:', rating);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newRating = (filmData.rating + rating) / 2;
    setFilmData(prev => ({
      ...prev,
      rating: parseFloat(newRating.toFixed(1))
    }));
  };

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
        />
        
        <VideoPlayer videoUrl={filmData.videoUrl} />
        
        <CommentsSection
          reviews={filmData.reviews}
          currentUserId={1}
          isModerator={false}
          onAddComment={handleAddComment}
          onAddReply={handleAddReply}
          onLikeComment={handleLikeComment}
          onDeleteComment={handleDeleteComment}
          onEditComment={handleEditComment}
        />
        
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
      />
    </Box>
  );
};