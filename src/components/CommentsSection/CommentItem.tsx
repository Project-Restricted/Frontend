import { Box, Avatar, Typography, Button } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import type { Review } from '../../types/film';
import { commentsStyles } from './Comments.styles';

interface CommentItemProps {
  comment: Review;
  onLike: (commentId: number) => void;
}

export const CommentItem = ({ 
  comment,
  onLike,
}: CommentItemProps) => {
  const formatTimestamp = (timestamp: number): string => {
    const timestampMs = timestamp * 1000;
    const now = Date.now();
    const diff = now - timestampMs;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'только что';
    
    if (minutes < 60) {
      if (minutes === 1) return '1 минуту назад';
      if (minutes < 5) return `${minutes} минуты назад`;
      return `${minutes} минут назад`;
    }
    
    if (hours < 24) {
      if (hours === 1) return '1 час назад';
      if (hours < 5) return `${hours} часа назад`;
      return `${hours} часов назад`;
    }
    
    if (days === 1) return '1 день назад';
    if (days < 5) return `${days} дня назад`;
    return `${days} дней назад`;
  };

  return (
    <Box sx={commentsStyles.commentItem}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Avatar 
          sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}
          src={comment.user.avatarUrl || undefined}
        >
          {comment.user.username?.charAt(0).toUpperCase() || '?'}
        </Avatar>
        
        <Box sx={{ flex: 1 }}>
          <Box sx={commentsStyles.commentHeader}>
            <Typography variant="subtitle1" sx={commentsStyles.userName}>
              {comment.user.username || 'Аноним'}
            </Typography>
            <Typography variant="caption" sx={commentsStyles.timestamp}>
              {formatTimestamp(comment.createdAt)}
            </Typography>
          </Box>

          <Typography variant="body1" sx={commentsStyles.commentText}>
            {comment.text}
          </Typography>

          <Box sx={commentsStyles.commentActions}>
            <Button
              startIcon={<Favorite />}
              size="small"
              onClick={() => onLike(comment.id)}
              sx={commentsStyles.actionButton}
              color={comment.likedByCurrentUser ? 'error' : 'inherit'}
            >
              {comment.likes}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};