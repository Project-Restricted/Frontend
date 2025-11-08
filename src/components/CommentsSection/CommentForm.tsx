import { Box, TextField, Button } from '@mui/material';
import { commentsStyles } from './Comments.styles';

interface CommentFormProps {
  newComment: string;
  onCommentChange: (value: string) => void;
  onSubmit: () => void;
}

export const CommentForm = ({ 
  newComment, 
  onCommentChange, 
  onSubmit 
}: CommentFormProps) => {
  const handleSubmit = () => {
    if (newComment.trim()) {
      onSubmit();
    }
  };

  return (
    <Box sx={commentsStyles.commentForm}>
      <TextField
        multiline
        rows={3}
        fullWidth
        placeholder="Оставьте ваш комментарий..."
        value={newComment}
        onChange={(e) => onCommentChange(e.target.value)}
        sx={commentsStyles.textField}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="outlined" 
          onClick={handleSubmit}
          disabled={!newComment.trim()}
          sx={commentsStyles.submitButton}
        >
          Оставить комментарий
        </Button>
      </Box>
    </Box>
  );
};