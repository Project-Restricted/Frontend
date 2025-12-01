import { useState } from 'react';
import { Container, Button, Box, Paper } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { profileStyles } from '../components/ProfilePage/Profile.styles';
import { ProfileHeader } from '../components/ProfilePage/ProfileHeader';
import { ProfileInfo } from '../components/ProfilePage/ProfileInfo';
import { ProfileStats } from '../components/ProfilePage/ProfileStats';
import { ProfileActions } from '../components/ProfilePage/ProfileActions';
import { EditProfileModal } from '../components/ProfilePage/EditProfileModal';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    id: 1,
    email: 'alexey@example.com',
    username: 'Алексей',
    avatarUrl: '',
    averageRating: 4.2,
    reviewsCount: 24,
    isModerator: false,
    createdAt: Date.now()
  });

  const handleBackClick = () => {
    navigate('/');
  };

  const handleBecomeModerator = () => {
    setHasPendingRequest(true);
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = async (data: { username: string; avatarUrl: string }) => {
    console.log('Сохранение данных:', data);
       
    setUserData(prev => ({
      ...prev,
      username: data.username,
      avatarUrl: data.avatarUrl
    }));
        
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
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
                username={userData.username}
                avatarUrl={userData.avatarUrl}
              />

              <Box sx={profileStyles.content}>
                <ProfileInfo 
                  email={userData.email}
                  joinedDaysAgo={128}
                />
                
                <ProfileStats 
                  reviewsCount={userData.reviewsCount}
                  averageRating={userData.averageRating}
                />
                
                <ProfileActions
                  userRole={userData.isModerator ? 'moderator' : 'user'}
                  hasPendingRequest={hasPendingRequest}
                  onBecomeModerator={handleBecomeModerator}
                  onEditProfile={handleEditProfile}
                />
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
   
      <EditProfileModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleSaveProfile}
        initialData={{
          username: userData.username,
          avatarUrl: userData.avatarUrl
        }}
      />
    </>
  );
};