import { useState } from 'react';
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  IconButton,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addTagModalStyles } from './AddTagModal.styles';

interface AddTagModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (tagName: string) => Promise<void>;
  existingTags?: string[];
}

export const AddTagModal = ({ 
  open, 
  onClose, 
  onSubmit,
  existingTags = []
}: AddTagModalProps) => {
  const [tagName, setTagName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedTag = tagName.trim();
  
    if (!trimmedTag) {
      setError('Введите название тега');
      return;
    }
    
    const isDuplicate = existingTags.some(
      tag => tag.toLowerCase() === trimmedTag.toLowerCase()
    );
    
    if (isDuplicate) {
      setError('Такой тег уже существует');
      return;
    }
    
    if (trimmedTag.length < 2) {
      setError('Тег должен содержать минимум 2 символа');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await onSubmit(trimmedTag);
      setTagName('');
      onClose();
    } catch (error) {
      console.error('Ошибка при добавлении тега:', error);
      setError('Ошибка при добавлении тега');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setTagName('');
    setError('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-tag-modal"
    >
      <Box sx={addTagModalStyles.modal}>
        <Box sx={addTagModalStyles.header}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
            Добавить тег
          </Typography>
          <IconButton 
            onClick={handleClose} 
            sx={addTagModalStyles.closeButton}
            disabled={isSubmitting}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Название тега"
            value={tagName}
            onChange={(e) => {
              setTagName(e.target.value);
              setError('');
            }}
            sx={addTagModalStyles.textField}
            fullWidth
            required
            disabled={isSubmitting}
            error={!!error}
            helperText={error || "Введите название тега для фильма"}
            autoFocus
            inputProps={{ maxLength: 50 }}
          />

          {existingTags.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255,255,255,0.7)', 
                  mb: 1,
                  fontSize: '0.875rem'
                }}
              >
                Существующие теги: {existingTags.length}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.8rem',
                  fontStyle: 'italic'
                }}
              >
                {existingTags.slice(0, 5).join(', ')}
                {existingTags.length > 5 && '...'}
              </Typography>
            </Box>
          )}

          <Box sx={addTagModalStyles.actions}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={addTagModalStyles.cancelButton}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={addTagModalStyles.submitButton}
              disabled={isSubmitting || !tagName.trim()}
              startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isSubmitting ? 'Добавление...' : 'Добавить тег'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};