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
import { editCommentModalStyles } from './EditCommentModal.styles';

interface EditCommentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (text: string) => Promise<void>;
  initialText: string;
  commentId: number;
}

export const EditCommentModal = ({ 
  open, 
  onClose, 
  onSubmit,
  initialText
}: EditCommentModalProps) => {
  const [text, setText] = useState(initialText);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedText = text.trim();
    
    if (!trimmedText) {
      setError('Введите текст комментария');
      return;
    }
    
    if (trimmedText === initialText) {
      setError('Текст не изменился');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await onSubmit(trimmedText);
      onClose();
    } catch (error) {
      console.error('Ошибка при редактировании комментария:', error);
      setError('Ошибка при сохранении изменений');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setText(initialText);
    setError('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-comment-modal"
    >
      <Box sx={editCommentModalStyles.modal}>
        <Box sx={editCommentModalStyles.header}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
            Редактировать комментарий
          </Typography>
          <IconButton 
            onClick={handleClose} 
            sx={editCommentModalStyles.closeButton}
            disabled={isSubmitting}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>          
          <TextField
            label="Текст комментария"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError('');
            }}
            sx={editCommentModalStyles.textField}
            fullWidth
            multiline
            rows={4}
            required
            disabled={isSubmitting}
            error={!!error}
            autoFocus
          />

          <Box sx={editCommentModalStyles.actions}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={editCommentModalStyles.cancelButton}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={editCommentModalStyles.submitButton}
              disabled={isSubmitting || !text.trim() || text.trim() === initialText}
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