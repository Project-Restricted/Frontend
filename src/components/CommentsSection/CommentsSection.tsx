import { Paper, Typography, Box } from '@mui/material';
import { useState } from 'react';
import type { Review } from '../../types/film';
import { commentsStyles } from './Comments.styles';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';

interface CommentsSectionProps {
  reviews: Review[];
  currentUserId?: number;
  onAddComment: (text: string) => void;
  onLikeComment: (commentId: number) => void;
}

export const CommentsSection = ({
  reviews,
  onAddComment,
  onLikeComment
}: CommentsSectionProps) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    onAddComment(newComment);
    setNewComment('');
  };

  return (
    <Paper sx={commentsStyles.paper}>
      <Typography variant="h4" gutterBottom sx={commentsStyles.title}>
        Обсуждение фильма
      </Typography>

      <CommentForm
        newComment={newComment}
        onCommentChange={setNewComment}
        onSubmit={handleAddComment}
      />

      <Box>
        {reviews.length > 0 ? (
          reviews.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}              
              onLike={onLikeComment}
            />
          ))
        ) : (
          <Typography textAlign="center" sx={commentsStyles.emptyState}>
            Пока нет комментариев. Будьте первым!
          </Typography>
        )}
      </Box>
    </Paper>
  );
};