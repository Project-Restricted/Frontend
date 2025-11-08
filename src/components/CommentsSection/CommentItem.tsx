import { Box, Avatar, Typography, Button, TextField } from '@mui/material';
import { Favorite, Reply, Delete, Edit } from '@mui/icons-material';
import { useState } from 'react';
import type { Review } from '../../types/film';
import { commentsStyles } from './Comments.styles';

interface CommentItemProps {
  comment: Review;
  depth: number;
  currentUserId?: number;
  isModerator?: boolean;
  onLike: (commentId: number) => void;
  onReply: (parentId: number, text: string) => void;
  onDelete: (commentId: number) => void;
  onEdit: (commentId: number) => void;
  replyingTo?: number | null;
  onSetReplyingTo: (commentId: number | null) => void;
  getReplies: (parentId: number) => Review[];
}

export const CommentItem = ({ 
  comment, 
  depth = 0, 
  currentUserId,
  isModerator = false,
  onLike, 
  onReply, 
  onDelete,
  onEdit,
  replyingTo,
  onSetReplyingTo,
  getReplies
}: CommentItemProps) => {
  const [replyText, setReplyText] = useState('');
  const isMaxDepth = depth >= 3;
  const canDelete = isModerator || comment.user.id === currentUserId;
  const canEdit = comment.user.id === currentUserId;

  const replies = getReplies(comment.id);

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText('');
      onSetReplyingTo(null);
    }
  };

  const formatTimestamp = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
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
          src={comment.user.avatarUrl}
        >
          {comment.user.username.charAt(0).toUpperCase()}
        </Avatar>
        
        <Box sx={{ flex: 1 }}>
          <Box sx={commentsStyles.commentHeader}>
            <Typography variant="subtitle1" sx={commentsStyles.userName}>
              {comment.user.username}
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
            >
              {comment.likes}
            </Button>
            
            {!isMaxDepth && (
              <Button
                startIcon={<Reply />}
                size="small"
                onClick={() => onSetReplyingTo(comment.id)}
                sx={commentsStyles.actionButton}
              >
                Ответить
              </Button>
            )}

            {canEdit && (
              <Button
                startIcon={<Edit />}
                size="small"
                onClick={() => onEdit(comment.id)}
                sx={commentsStyles.actionButton}
              >
                Редактировать
              </Button>
            )}

            {canDelete && (
              <Button
                startIcon={<Delete />}
                size="small"
                onClick={() => onDelete(comment.id)}
                sx={commentsStyles.actionButton}
              >
                Удалить
              </Button>
            )}
          </Box>

          {replyingTo === comment.id && (
            <Box sx={commentsStyles.replyForm}>
              <TextField
                size="small"
                fullWidth
                placeholder="Ваш ответ..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                sx={commentsStyles.replyTextField}
              />
              <Box sx={commentsStyles.replyActions}>
                <Button 
                  onClick={() => onSetReplyingTo(null)}
                  sx={commentsStyles.actionButton}
                >
                  Отмена
                </Button>
                <Button 
                  variant="contained" 
                  onClick={handleReplySubmit}
                  disabled={!replyText.trim()}
                >
                  Отправить
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {replies.length > 0 && (
        <Box sx={commentsStyles.repliesContainer}>
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              currentUserId={currentUserId}
              isModerator={isModerator}
              onLike={onLike}
              onReply={onReply}
              onDelete={onDelete}
              onEdit={onEdit}
              replyingTo={replyingTo}
              onSetReplyingTo={onSetReplyingTo}
              getReplies={getReplies}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};