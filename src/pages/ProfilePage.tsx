import { Container, Button, Box, Paper, CircularProgress, Alert, Snackbar } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { profileStyles } from '../components/ProfilePage/Profile.styles';
import { ProfileHeader } from '../components/ProfilePage/ProfileHeader';
import { ProfileInfo } from '../components/ProfilePage/ProfileInfo';
import { ProfileStats } from '../components/ProfilePage/ProfileStats';
import { ProfileActions } from '../components/ProfilePage/ProfileActions';
import { EditProfileModal } from '../components/ProfilePage/EditProfileModal';
import { usersApi } from '../api/users';
import type { User } from '../types/user';

export const ProfilePage = () => {
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await usersApi.getCurrentUser();
        
        if (!data.username) {
          throw new Error('Отсутствует имя пользователя');
        }
        
        setUserData(data);
        
        let requestPending = false;
        
        const savedRequest = localStorage.getItem('moderator_request_pending');
        
        if (savedRequest === 'true') {
          requestPending = true;
        }
        
        const requestData = localStorage.getItem('moderator_request_data');
        if (requestData) {
          try {
            const parsedData = JSON.parse(requestData);
            if (parsedData.status === 'pending') {
              requestPending = true;
            }
          } catch (e) {
            console.log('Ошибка парсинга данных запроса:', e);
          }
        }
        
        if (data.isModerator) {
          requestPending = false;
          localStorage.removeItem('moderator_request_pending');
          localStorage.removeItem('moderator_request_data');
        }
        
        setHasPendingRequest(requestPending);
        
      } catch (err: any) {
        if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('currentUser');
          navigate('/');
          return;
        }
        
        setError(err.message || 'Не удалось загрузить данные профиля');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [navigate]);

  if (!localStorage.getItem('access_token')) {
    return (
      <Box sx={profileStyles.container}>
        <Container maxWidth="md">
          <Button 
            startIcon={<ArrowBack />} 
            onClick={() => navigate('/')} 
            sx={profileStyles.backButton}
          >
            Назад к каталогу
          </Button>
          <Paper sx={{ p: 4, textAlign: 'center', mt: 2 }}>
            <Alert severity="error">
              Пользователь не авторизован
            </Alert>
          </Paper>
        </Container>
      </Box>
    );
  }

  const handleBackClick = () => {
    navigate('/');
  };

  const handleBecomeModerator = async () => {
    if (userData?.isModerator || hasPendingRequest) {
      return;
    }
    
    const message = prompt(
      '📝 Заявка на роль модератора\n\n' +
      'Расскажите, почему вы хотите стать модератором и какой у вас опыт.\n' +
      '(сообщение необязательно, но поможет администраторам принять решение)',
      ''
    );
    
    if (message === null) return;
    
    try {
      const response = await usersApi.requestModerator(message || undefined);
      
      if (response.success) {
        setHasPendingRequest(true);
        localStorage.setItem('moderator_request_pending', 'true');
        
        if (response.request) {
          localStorage.setItem('moderator_request_data', JSON.stringify(response.request));
        }
        
        setSnackbar({ 
          message: '✅ Запрос успешно отправлен! Ожидайте решения администратора.', 
          type: 'success' 
        });
      } else {
        const errorMsg = response.error || response.message || 'Неизвестная ошибка';
        let friendlyMsg = errorMsg;
        
        if (errorMsg.toLowerCase().includes('already have a pending')) {
          friendlyMsg = '📋 У вас уже есть активная заявка на модерацию.';
          setHasPendingRequest(true);
          localStorage.setItem('moderator_request_pending', 'true');
        }
        
        setSnackbar({ message: friendlyMsg, type: 'warning' });
      }
      
    } catch (error: any) {
      console.error('Ошибка при запросе модератора:', error);
      
      let userMessage = '❌ Ошибка при отправке запроса';
      let messageType: 'error' | 'warning' | 'info' = 'error';
      
      if (error.data?.error?.toLowerCase().includes('already have a pending')) {
        userMessage = '📝 У вас уже есть активный запрос на модерацию!\n\n' +
                     'Не отправляйте повторно. Ваша заявка уже на рассмотрении.';
        messageType = 'info';
        setHasPendingRequest(true);
        localStorage.setItem('moderator_request_pending', 'true');
      }
      else if (error.status === 400) {
        userMessage = '⚠️ Проверьте введенные данные. Сервер вернул ошибку.';
        messageType = 'warning';
      }
      else if (error.status === 401) {
        userMessage = '🔒 Требуется авторизация. Пожалуйста, войдите заново.';
        messageType = 'error';
      }
      else if (error.status === 403) {
        userMessage = '⛔ У вас недостаточно прав для этого действия.';
        messageType = 'error';
      }
      else if (error.status === 429) {
        userMessage = '⏱️ Слишком много запросов. Попробуйте позже.';
        messageType = 'warning';
      }
      
      setSnackbar({ 
        message: userMessage, 
        type: messageType 
      });
    }
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = async (data: { username: string; avatarUrl: string }) => {
    try {
      const updatedUser = await usersApi.updateProfile({
        username: data.username,
        avatarUrl: data.avatarUrl
      });
      
      setUserData(updatedUser);
      setSnackbar({ message: 'Профиль обновлен!', type: 'success' });
      
    } catch (error: any) {
      setSnackbar({ message: error.message || 'Ошибка обновления профиля', type: 'error' });
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  };

  const calculateJoinedDaysAgo = (createdAt?: string): number => {
    if (!createdAt) return 0;
    const joinDate = new Date(createdAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - joinDate.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  if (isLoading) {
    return (
      <Box sx={profileStyles.container}>
        <Container maxWidth="md" sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}>
          <CircularProgress />
        </Container>
      </Box>
    );
  }

  if (error || !userData) {
    return (
      <Box sx={profileStyles.container}>
        <Container maxWidth="md">
          <Button 
            startIcon={<ArrowBack />} 
            onClick={handleBackClick} 
            sx={profileStyles.backButton}
          >
            Назад к каталогу
          </Button>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="error">
              {error || 'Профиль не найден'}
            </Alert>
          </Paper>
        </Container>
      </Box>
    );
  }

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
                avatarUrl={userData.avatarUrl || undefined}
                isModerator={userData.isModerator}
              />

              <Box sx={profileStyles.content}>
                <ProfileInfo
                  email={userData.email}
                  joinedDaysAgo={calculateJoinedDaysAgo(userData.created_at)}
                  isModerator={userData.isModerator}
                />
                
                <ProfileStats
                  reviewsCount={userData.reviewsCount || 0}
                  averageRating={userData.averageRating || 0}
                />
                
                <ProfileActions
                  hasPendingRequest={hasPendingRequest}
                  onBecomeModerator={handleBecomeModerator}
                  onEditProfile={handleEditProfile}
                  isModerator={userData.isModerator}
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
          avatarUrl:userData.avatarUrl || ''
        }}
      />

      <Snackbar
        open={!!snackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar?.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};