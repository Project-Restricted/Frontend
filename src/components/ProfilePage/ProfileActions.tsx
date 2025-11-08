import { Box, Button } from '@mui/material';
import { Shield, Edit } from '@mui/icons-material';
import { profileStyles } from './Profile.styles';

interface ProfileActionsProps {
  userRole: string;
  hasPendingRequest: boolean;
  onBecomeModerator: () => void;
  onEditProfile: () => void;
}

export const ProfileActions = ({ 
  userRole, 
  hasPendingRequest, 
  onBecomeModerator, 
  onEditProfile 
}: ProfileActionsProps) => {
  return (
    <Box sx={profileStyles.actionsContainer}>
      {userRole === 'user' && !hasPendingRequest && (
        <Button
          startIcon={<Shield />}
          variant="outlined"
          onClick={onBecomeModerator}
          sx={profileStyles.moderatorButton}
        >
          Стать модератором
        </Button>
      )}
      
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