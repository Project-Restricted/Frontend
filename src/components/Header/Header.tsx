import { AppBar, Toolbar, Box } from '@mui/material';
import type { User } from '../../types/user';
import { headerStyles } from './Header.styles';
import { LogoSection } from './LogoSection';
import { UserSection } from './UserSection';
import { AuthSection } from './AuthSection';

interface HeaderProps {
  currentUser?: User | null;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogoutClick: () => void;
  onProfileClick: () => void;
}

export const Header = ({ 
  currentUser,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  onProfileClick
}: HeaderProps) => {
  return (
    <AppBar position="sticky" sx={headerStyles.appBar}>
      <Toolbar sx={headerStyles.toolbar}>
        <LogoSection />
        
        <Box>
          {currentUser ? (
            <UserSection 
              user={currentUser}
              onLogoutClick={onLogoutClick}
              onProfileClick={onProfileClick}
            />
          ) : (
            <AuthSection 
              onLoginClick={onLoginClick}
              onRegisterClick={onRegisterClick}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};