import { Box, Avatar, Typography } from '@mui/material';
import { Security } from '@mui/icons-material';
import { profileStyles } from './Profile.styles';

interface ProfileHeaderProps {
  username: string;
  avatarUrl?: string;
  isModerator?: boolean;
}

export const ProfileHeader = ({ username, avatarUrl, isModerator = false }: ProfileHeaderProps) => {
  return (
    <Box sx={profileStyles.avatarSection}>
      <Avatar 
        sx={profileStyles.avatar}
        src={avatarUrl}
      >
        {username.charAt(0).toUpperCase()}
      </Avatar>
      
      <Typography variant="h4" sx={profileStyles.username}>
        {username}
      </Typography>
      
      <Box 
        sx={isModerator ? profileStyles.moderatorBadge : profileStyles.userBadge}
      >
        <Security sx={{ fontSize: '20px' }} />
        <Typography variant="body1" sx={{ ml: 1 }}>
          {isModerator ? "Модератор" : "Пользователь"}
        </Typography>
      </Box>
    </Box>
  );
};