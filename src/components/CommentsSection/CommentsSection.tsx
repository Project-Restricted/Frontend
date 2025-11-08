import { Paper, Typography, Box } from '@mui/material';
import { useState } from 'react';
import type { Review } from '../../types/film';
import { commentsStyles } from './Comments.styles';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';

interface CommentsSectionProps {
  reviews: Review[];
  currentUserId?: number;
  isModerator?: boolean;
  onAddComment: (text: string) => void;
  onAddReply: (parentId: number, text: string) => void;
  onLikeComment: (commentId: number) => void;
  onDeleteComment: (commentId: number) => void;
}

export const CommentsSection = ({
  reviews,
  currentUserId,
  isModerator = false,
  onAddComment,
  onAddReply,
  onLikeComment,
  onDeleteComment
}: CommentsSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const handleAddComment = () => {
    onAddComment(newComment);
    setNewComment('');
  };

  const getRootComments = () => {
    return reviews.filter(comment => comment.replyOn === 0);
  };

  const getReplies = (parentId: number) => {
    return reviews.filter(comment => comment.replyOn === parentId);
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
        {getRootComments().length > 0 ? (
          getRootComments().map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              depth={0}
              currentUserId={currentUserId}
              isModerator={isModerator}
              onLike={onLikeComment}
              onReply={onAddReply}
              onDelete={onDeleteComment}
              replyingTo={replyingTo}
              onSetReplyingTo={setReplyingTo}
              getReplies={getReplies}
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