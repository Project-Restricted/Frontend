import { Box, Typography, Button, Avatar, IconButton } from '@mui/material';
import type { User } from '../../types/user';
import { headerStyles } from './Header.styles';

interface UserSectionProps {
  user: User;
  onLogoutClick: () => void;
  onProfileClick: () => void;
}

export const UserSection = ({ user, onLogoutClick, onProfileClick }: UserSectionProps) => {
  return (
    <Box sx={headerStyles.userSection}>
      <Typography variant="h6" sx={headerStyles.greeting}>
        Привет, {user.username}!
      </Typography>
      
      <IconButton onClick={onProfileClick} size="large">
        <Avatar 
          sx={headerStyles.avatar}
          src={user.avatarUrl}
        >
          {user.username.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>
      
      <Button 
        variant="outlined" 
        size="large"
        onClick={onLogoutClick}
        sx={headerStyles.button}
      >
        Выйти
      </Button>
    </Box>
  );
};