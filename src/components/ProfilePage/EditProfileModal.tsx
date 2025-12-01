import { useState } from 'react';
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  IconButton,
  CircularProgress,
  Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { editProfileModalStyles } from './EditProfileModal.styles';

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: { username: string; avatarUrl: string }) => Promise<void>;
  initialData: {
    username: string;
    avatarUrl: string;
  };
}

export const EditProfileModal = ({ 
  open, 
  onClose, 
  onSubmit,
  initialData 
}: EditProfileModalProps) => {
  const [formData, setFormData] = useState({
    username: initialData.username || '',
    avatarUrl: initialData.avatarUrl || ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(initialData.avatarUrl);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username.trim()) {
      alert('Введите имя пользователя');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        console.log('Изменения (демо):', formData);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      onClose();
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      alert('Ошибка при сохранении изменений');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setAvatarPreview(result);
      setFormData(prev => ({
        ...prev,
        avatarUrl: result
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-profile-modal"
    >
      <Box sx={editProfileModalStyles.modal}>
        <Box sx={editProfileModalStyles.header}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
            Редактировать профиль
          </Typography>
          <IconButton 
            onClick={onClose} 
            sx={editProfileModalStyles.closeButton}
            disabled={isSubmitting}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={editProfileModalStyles.avatarSection}>
            <Avatar
              src={avatarPreview}
              sx={editProfileModalStyles.avatar}
            />
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={editProfileModalStyles.uploadButton}
              disabled={isSubmitting}
            >
              Загрузить фото
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleAvatarUpload}
              />
            </Button>
          </Box>
         
          <TextField
            label="Имя пользователя"
            value={formData.username}
            onChange={handleInputChange('username')}
            sx={editProfileModalStyles.textField}
            fullWidth
            required
            disabled={isSubmitting}
            helperText="Это имя будет отображаться другим пользователям"
          />
         
          <Box sx={editProfileModalStyles.actions}>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={editProfileModalStyles.cancelButton}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={editProfileModalStyles.submitButton}
              disabled={isSubmitting || !formData.username.trim()}
              startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};