import { Container, Button, Box, Paper } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { profileStyles } from './Profile.styles';
import { ProfileHeader } from './ProfileHeader';
import { ProfileInfo } from './ProfileInfo';
import { ProfileStats } from './ProfileStats';
import { ProfileActions } from './ProfileActions';

const userStats = {
  reviewsCount: 24,
  averageRating: 4.2,
  joinedDaysAgo: 128
};

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [hasPendingRequest, setHasPendingRequest] = useState(false);

  const user = {
    id: 1,
    username: 'Алексей',
    avatarUrl: "",
    email: 'alexey@example.com',
    role: 'user' as const
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const handleBecomeModerator = () => {
    setHasPendingRequest(true);
    console.log('Заявка на модерацию отправлена');
  };

  const handleEditProfile = () => {
    console.log('Редактирование профиля');
  };

  return (
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
              username={user.username}
              avatarUrl={user.avatarUrl}
            />

            <Box sx={profileStyles.content}>
              <ProfileInfo 
                email={user.email}
                joinedDaysAgo={userStats.joinedDaysAgo}
              />
              
              <ProfileStats 
                reviewsCount={userStats.reviewsCount}
                averageRating={userStats.averageRating}
              />
              
              <ProfileActions
                userRole={user.role}
                hasPendingRequest={hasPendingRequest}
                onBecomeModerator={handleBecomeModerator}
                onEditProfile={handleEditProfile}
              />
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};