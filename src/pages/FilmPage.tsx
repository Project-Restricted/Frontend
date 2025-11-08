import { Container, Button, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { FilmInfo } from '../components/FilmInfo/FilmInfo';
import { VideoPlayer } from '../components/VideoPlayer/VideoPlayer';
import { CommentsSection } from '../components/CommentsSection/CommentsSection';
import { mockFilmDetails } from '../data';

export const FilmPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleAddComment = (text: string) => {
    console.log('Добавить комментарий:', text);
  };

  const handleAddReply = (parentId: number, text: string) => {
    console.log('Добавить ответ:', parentId, text);
  };

  const handleLikeComment = (commentId: number) => {
    console.log('Лайк комментария:', commentId);
  };

  const handleDeleteComment = (commentId: number) => {
    console.log('Удалить комментарий:', commentId);
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

        <FilmInfo film={mockFilmDetails} />
        
        <VideoPlayer videoUrl={mockFilmDetails.videoUrl} />
        
        <CommentsSection
          reviews={mockFilmDetails.reviews}
          currentUserId={1}
          isModerator={false}
          onAddComment={handleAddComment}
          onAddReply={handleAddReply}
          onLikeComment={handleLikeComment}
          onDeleteComment={handleDeleteComment}
        />
        
      </Container>
    </Box>
  );
};