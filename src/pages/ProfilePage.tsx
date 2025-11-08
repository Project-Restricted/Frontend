import { useState } from 'react';
import { Container, Button, Box, Paper } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { profileStyles } from '../components/ProfilePage/Profile.styles';
import { ProfileHeader } from '../components/ProfilePage/ProfileHeader';
import { ProfileInfo } from '../components/ProfilePage/ProfileInfo';
import { ProfileStats } from '../components/ProfilePage/ProfileStats';
import { ProfileActions } from '../components/ProfilePage/ProfileActions';

const mockUser = {
  id: 1,
  email: 'alexey@example.com',
  username: 'Алексей',
  avatarUrl: '',
  averageRating: 4.2,
  reviewsCount: 24,
  isModerator: false,
  createdAt: Date.now()
};

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [hasPendingRequest, setHasPendingRequest] = useState(false);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleBecomeModerator = () => {
    setHasPendingRequest(true);
  };

  const handleEditProfile = () => {
    
  };

  return (
    <> 
      <Box sx={profileStyles.container}>
        <Container maxWidth="md" sx={{ 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Button 
            startIcon={<ArrowBack />} 
            onClick={handleBackClick}
            sx={profileStyles.backButton}
          >
            Назад к каталогу
          </Button>

          <Paper sx={profileStyles.paper}>
            <Box sx={profileStyles.layout}>
              <ProfileHeader 
                username={mockUser.username}
                avatarUrl={mockUser.avatarUrl}
              />

              <Box sx={profileStyles.content}>
                <ProfileInfo 
                  email={mockUser.email}
                  joinedDaysAgo={128}
                />
                
                <ProfileStats 
                  reviewsCount={mockUser.reviewsCount}
                  averageRating={mockUser.averageRating}
                />
                
                <ProfileActions
                  userRole={mockUser.isModerator ? 'moderator' : 'user'}
                  hasPendingRequest={hasPendingRequest}
                  onBecomeModerator={handleBecomeModerator}
                  onEditProfile={handleEditProfile}
                />
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};