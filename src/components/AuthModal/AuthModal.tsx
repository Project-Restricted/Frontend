import { Modal, Box, Tabs, Tab } from '@mui/material';
import { useState, useEffect } from 'react';
import type { LoginRequest, RegisterRequest } from '../../types/user';
import { authModalStyles } from './AuthModal.styles';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

interface AuthModalProps {
  open: boolean;
  type?: 'login' | 'register';
  onClose: () => void;
  onLogin: (data: LoginRequest) => void;
  onRegister: (data: RegisterRequest) => void;
}

export const AuthModal = ({ open, type = 'login', onClose, onLogin, onRegister }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(type === 'login' ? 0 : 1);

  useEffect(() => {
    setActiveTab(type === 'login' ? 0 : 1);
  }, [type]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleLoginSubmit = (data: LoginRequest) => {
    onLogin(data);
    onClose();
  };

  const handleRegisterSubmit = (data: RegisterRequest) => {
    onRegister(data);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={authModalStyles.modal}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          sx={authModalStyles.tabs}
          centered
        >
          <Tab label="Вход" sx={authModalStyles.tab} />
          <Tab label="Регистрация" sx={authModalStyles.tab} />
        </Tabs>

        {activeTab === 0 ? (
          <LoginForm
            onSubmit={handleLoginSubmit}
            onSwitchToRegister={() => setActiveTab(1)}
          />
        ) : (
          <RegisterForm
            onSubmit={handleRegisterSubmit}
            onSwitchToLogin={() => setActiveTab(0)}
          />
        )}
      </Box>
    </Modal>
  );
};