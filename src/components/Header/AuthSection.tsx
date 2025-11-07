import { Box, Button } from '@mui/material';
import { headerStyles } from './Header.styles';

interface AuthSectionProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export const AuthSection = ({ onLoginClick, onRegisterClick }: AuthSectionProps) => {
  return (
    <Box sx={headerStyles.authSection}>
      <Button 
        variant="outlined" 
        size="large"              
        onClick={onLoginClick}
        sx={headerStyles.button}
      >
        Войти
      </Button>
      <Button 
        variant="outlined" 
        size="large"
        onClick={onRegisterClick}
        sx={headerStyles.button}
      >
        Регистрация
      </Button>
    </Box>
  );
};