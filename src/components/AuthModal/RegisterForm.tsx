import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import type { RegisterRequest } from '../../types/user';
import { authModalStyles } from './AuthModal.styles';

interface RegisterFormProps {
  onSubmit: (data: RegisterRequest) => void;
  onSwitchToLogin: () => void;
}

export const RegisterForm = ({ onSubmit, onSwitchToLogin }: RegisterFormProps) => {
  const [formData, setFormData] = useState<RegisterRequest>({
    name: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: ''
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
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2,
          mb: 2
        }}
      >
        <TextField
          label="Фамилия"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          sx={authModalStyles.textField}
          fullWidth
          required
          autoComplete="off"
          inputProps={{ autoComplete: 'off' }}
        />
        
        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          sx={authModalStyles.textField}
          fullWidth
          required
          autoComplete="off"
          inputProps={{ autoComplete: 'off' }}
        />

        <TextField
          label="Имя"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          sx={authModalStyles.textField}
          fullWidth
          required
          autoComplete="off"
          inputProps={{ autoComplete: 'off' }}
        />

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
          label="Отчество"
          value={formData.middleName}
          onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
          sx={authModalStyles.textField}
          fullWidth
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
        
        <TextField
          label="Дата рождения"
          type="date"
          value={formData.birthDate}
          onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
          sx={authModalStyles.textField}
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          autoComplete="off"
          inputProps={{ autoComplete: 'off' }}
        />   

        <TextField
          label="Подтверждение пароля"
          type="password"
          value={formData.passwordConfirm}
          onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
          sx={authModalStyles.textField}
          fullWidth
          required
          autoComplete="new-password"
          inputProps={{ autoComplete: 'new-password' }}
        />
      </Box>

      <Button 
        type="submit" 
        variant="contained" 
        sx={authModalStyles.submitButton}
        fullWidth
      >
        Зарегистрироваться
      </Button>

      <Button 
        onClick={onSwitchToLogin}
        sx={{ color: 'white', mt: 1 }}
        fullWidth
      >
        Уже есть аккаунт?
      </Button>
    </Box>
  );
};