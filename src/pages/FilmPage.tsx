import { Container, Button, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { FilmInfo } from '../components/FilmInfo/FilmInfo';
import { mockFilmDetails } from '../data';

export const FilmPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
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
        
      </Container>
    </Box>
  );
};