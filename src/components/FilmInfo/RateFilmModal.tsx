import { useState } from 'react';
import {
  Box,
  Modal,
  Button,
  Typography,
  IconButton,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { rateFilmModalStyles } from './RateFilmModal.styles';

interface RateFilmModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => Promise<void>;
  filmTitle?: string;
}

export const RateFilmModal = ({ 
  open, 
  onClose, 
  onSubmit,
  filmTitle = ''
}: RateFilmModalProps) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (selectedRating === 0) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(selectedRating);
      setSelectedRating(0);
      setHoverRating(0);
      onClose();
    } catch (error) {
      console.error('Ошибка при оценке фильма:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedRating(0);
    setHoverRating(0);
    onClose();
  };

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleStarHover = (rating: number) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const getRatingDescription = (rating: number): string => {
    if (rating <= 2) return 'Ужасно';
    if (rating <= 4) return 'Плохо';
    if (rating <= 6) return 'Средне';
    if (rating <= 8) return 'Хорошо';
    return 'Отлично';
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="rate-film-modal"
    >
      <Box sx={rateFilmModalStyles.modal}>
        <Box sx={rateFilmModalStyles.header}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
            Оценить фильм
          </Typography>
          <IconButton 
            onClick={handleClose} 
            sx={rateFilmModalStyles.closeButton}
            disabled={isSubmitting}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={rateFilmModalStyles.content}>
          {filmTitle && (
            <Typography 
              variant="subtitle1" 
              sx={{ color: 'white', mb: 2, textAlign: 'center' }}
            >
              {filmTitle}
            </Typography>
          )}

          <Box 
            sx={rateFilmModalStyles.starsContainer}
            onMouseLeave={handleStarLeave}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => {
              const isFilled = star <= (hoverRating || selectedRating);
              return (
                <IconButton
                  key={star}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  sx={rateFilmModalStyles.starButton}
                  disabled={isSubmitting}
                  aria-label={`Оценить на ${star} из 10`}
                >
                  {isFilled ? (
                    <StarIcon sx={rateFilmModalStyles.filledStar} />
                  ) : (
                    <StarBorderIcon sx={rateFilmModalStyles.emptyStar} />
                  )}
                </IconButton>
              );
            })}
          </Box>

          <Typography 
            variant="h5" 
            sx={{ color: 'white', textAlign: 'center', mt: 2, mb: 1 }}
          >
            {selectedRating > 0 ? `${selectedRating} из 10` : 'Выберите оценку'}
          </Typography>

          {selectedRating > 0 && (
            <Typography 
              variant="body2" 
              sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', mb: 3 }}
            >
              {getRatingDescription(selectedRating)}
            </Typography>
          )}

          <Box sx={rateFilmModalStyles.actions}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={rateFilmModalStyles.cancelButton}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={rateFilmModalStyles.submitButton}
              disabled={isSubmitting || selectedRating === 0}
              startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isSubmitting ? 'Отправка...' : 'Подтвердить оценку'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};