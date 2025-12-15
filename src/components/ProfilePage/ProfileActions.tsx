import { Box, Button } from '@mui/material';
import { Shield, Edit } from '@mui/icons-material';
import { profileStyles } from './Profile.styles';

interface ProfileActionsProps {
  hasPendingRequest: boolean;
  onBecomeModerator: () => void;
  onEditProfile: () => void;
  isModerator?: boolean;
}

export const ProfileActions = ({ 
  hasPendingRequest, 
  onBecomeModerator, 
  onEditProfile,
  isModerator = false
}: ProfileActionsProps) => {
  
  const getButtonText = () => {
    if (isModerator) return 'Заявка одобрена';
    if (hasPendingRequest) return 'Заявка на рассмотрении';
    return 'Стать модератором';
  };

  const getIsDisabled = () => {
    return isModerator || hasPendingRequest;
  };

  return (
    <Box sx={profileStyles.actionsContainer}>
      <Button
        startIcon={<Shield />}
        variant={isModerator ? 'contained' : 'outlined'}
        onClick={isModerator || hasPendingRequest ? undefined : onBecomeModerator}
        disabled={getIsDisabled()}
        sx={{
          ...profileStyles.moderatorButton,
          ...(isModerator ? { 
            bgcolor: 'black',            
            color: 'white',
            '&.Mui-disabled': {
              bgcolor: 'black',              
              color: 'white',
              opacity: 0.9
            }
          } : {}),
          ...(hasPendingRequest ? {             
            color: 'warning.main',
            '&.Mui-disabled': {
              borderColor: 'warning.main',
              color: 'warning.main',
              opacity: 0.7
            }
          } : {})
        }}
      >
        {getButtonText()}
      </Button>
      
      <Button
        startIcon={<Edit />}
        variant="outlined"
        onClick={onEditProfile}
        sx={profileStyles.editButton}
      >
        Редактировать профиль
      </Button>
    </Box>
  );
};