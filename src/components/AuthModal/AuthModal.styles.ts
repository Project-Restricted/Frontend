export const authModalStyles = {
  modal: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '#000000',
    border: '2px solid #ffffff',
    borderRadius: 3,
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    p: 4,
    outline: 'none'
  },
  tabs: {
    borderBottom: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    mb: 3
  },
  tab: {
    color: 'white',
    fontWeight: 'bold'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      color: 'white',
      backgroundColor: 'rgba(255,255,255,0.1)',
      '& fieldset': {
        borderColor: 'rgba(255,255,255,0.3)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255,255,255,0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(255,255,255,0.8)',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255,255,255,0.7)',
    }
  },
  submitButton: {
    bgcolor: 'white',
    color: 'black',
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: 'rgba(255,255,255,0.9)',
    }
  }
} as const;