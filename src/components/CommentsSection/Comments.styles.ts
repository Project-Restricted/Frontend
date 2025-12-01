export const commentsStyles = {
  paper: {
    bgcolor: '#000000',
    backdropFilter: 'blur(10px)',
    borderRadius: 3,
    p: 3,
    border: '1px solid #ffffff',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    width: '100%'
  },
  title: {
    mb: 3, 
    color: 'white'
  },
  commentForm: {
    mb: 4
  },
  textField: {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'black',
      color: 'white',
      '& fieldset': { 
        borderColor: 'rgba(255,255,255,0.3)' 
      },
      '&:hover fieldset': { 
        borderColor: 'rgba(255,255,255,0.5)' 
      },
      '&.Mui-focused fieldset': { 
        borderColor: 'rgba(255,255,255,0.8)' 
      }
    },
    '& .MuiInputBase-input': {
      color: 'white',
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'rgba(255,255,255,1)'
    }
  },
  submitButton: {
    bgcolor: 'black',
    color: 'white',
    borderColor: 'white',
    '&.Mui-disabled': {
      bgcolor: 'black',
      color: 'white',
      border: '2px solid white',
    }
  },
  emptyState: {
    py: 4, 
    color: 'white'
  },
  commentItem: {
    mb: 3
  },
  commentHeader: {
    display: 'flex', 
    alignItems: 'center', 
    gap: 1, 
    mb: 1
  },
  userName: {
    color: 'white',
    fontWeight: 'bold'
  },
  timestamp: {
    color: 'rgba(255,255,255,0.6)'
  },
  commentText: {
    mb: 1, 
    lineHeight: 1.5, 
    color: 'white'
  },
  commentActions: {
    display: 'flex', 
    gap: 2, 
    alignItems: 'center'
  },
  actionButton: {
    color: 'rgba(255,255,255,1)'
  },
  replyForm: {
    mt: 2
  },
  replyActions: {
    display: 'flex', 
    gap: 1, 
    justifyContent: 'flex-end'
  },
  repliesContainer: {
    mt: 2, 
    ml: 4,
    borderLeft: '1px solid #ffffff',
    pl: 2
  },
  replyTextField: {
    mb: 1,
    '& .MuiOutlinedInput-root': {
      color: 'white',
      backgroundColor: 'black',
      '& fieldset': { 
        borderColor: 'rgba(255,255,255,0.3)' 
      },
      '&:hover fieldset': { 
        borderColor: 'rgba(255,255,255,0.5)' 
      },
      '&.Mui-focused fieldset': { 
        borderColor: 'rgba(255,255,255,0.8)' 
      }
    },
    '& .MuiInputBase-input': {
      color: 'white',
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'rgba(255,255,255,0.5)'
    }
  }
} as const;