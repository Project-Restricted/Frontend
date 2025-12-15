import { useState, useEffect } from 'react';
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
  userRating?: number | null;
}

export const RateFilmModal = ({ 
  open, 
  onClose, 
  onSubmit,
  filmTitle = '',
  userRating
}: RateFilmModalProps) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open && userRating) {
      setSelectedRating(userRating);
    }
  }, [open, userRating]);

  const handleSubmit = async () => {
    if (selectedRating === 0) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(selectedRating);
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

  const getModalTitle = () => {
    if (userRating) {
      return 'Изменить оценку фильма';
    }
    return 'Оценить фильм';
  };

  const getCurrentRatingText = () => {
    if (userRating && selectedRating === 0) {
      return `Ваша текущая оценка: ${userRating} из 10`;
    }
    return selectedRating > 0 ? `${selectedRating} из 10` : 'Выберите оценку';
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
            {getModalTitle()}
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

          {userRating && selectedRating === 0 && (
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#fbbf24', 
                mb: 2, 
                textAlign: 'center',
                fontStyle: 'italic'
              }}
            >
              Вы уже оценили этот фильм
            </Typography>
          )}

          <Box 
            sx={rateFilmModalStyles.starsContainer}
            onMouseLeave={handleStarLeave}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => {
              const displayRating = hoverRating || selectedRating || (userRating || 0);
              const isFilled = star <= displayRating;
              
              return (
                <IconButton
                  key={star}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  sx={{
                    ...rateFilmModalStyles.starButton,
                    ...(userRating && star <= userRating && selectedRating === 0 && {
                      border: '1px solid rgba(251, 191, 36, 0.3)',
                    })
                  }}
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
            sx={{ 
              color: 'white', 
              textAlign: 'center', 
              mt: 2, 
              mb: 1,
              ...(userRating && selectedRating === 0 && { color: '#fbbf24' })
            }}
          >
            {getCurrentRatingText()}
          </Typography>

          {(selectedRating > 0 || userRating) && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255,255,255,0.7)', 
                textAlign: 'center', 
                mb: 3 
              }}
            >
              {getRatingDescription(selectedRating || userRating || 0)}
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
              {isSubmitting 
                ? 'Отправка...' 
                : userRating 
                  ? 'Обновить оценку' 
                  : 'Подтвердить оценку'
              }
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};