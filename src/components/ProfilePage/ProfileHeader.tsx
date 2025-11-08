import { Box, Avatar, Typography } from '@mui/material';
import { profileStyles } from './Profile.styles';

interface ProfileHeaderProps {
  username: string;
  avatarUrl?: string;
}

export const ProfileHeader = ({ username, avatarUrl }: ProfileHeaderProps) => {
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
    </Box>
  );
};