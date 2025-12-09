import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import type { LoginRequest } from '../../types/user';
import { authModalStyles } from './AuthModal.styles';

interface LoginFormProps {
  onSubmit: (data: LoginRequest) => void;
  onSwitchToRegister: () => void;
}

export const LoginForm = ({ onSubmit, onSwitchToRegister }: LoginFormProps) => {
  const [formData, setFormData] = useState<LoginRequest>({
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={authModalStyles.form}
      autoComplete="off"
    >
      <TextField
        label="Никнейм"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        sx={authModalStyles.textField}
        fullWidth
        required
        autoComplete="off"
        inputProps={{ autoComplete: 'off' }}
      />
      
      <TextField
        label="Пароль"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        sx={authModalStyles.textField}
        fullWidth
        required
        autoComplete="new-password"
        inputProps={{ autoComplete: 'new-password' }}
      />

      <Button 
        type="submit" 
        variant="contained" 
        sx={authModalStyles.submitButton}
        fullWidth
      >
        Войти
      </Button>

      <Button 
        onClick={onSwitchToRegister}
        sx={{ color: 'white', mt: 1 }}
        fullWidth
      >
        Нет аккаунта?
      </Button>
    </Box>
  );
};