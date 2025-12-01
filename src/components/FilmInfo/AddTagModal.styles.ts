export const addTagModalStyles = {
  modal: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#000000',
    border: '2px solid #ffffff',
    borderRadius: 3,
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    p: 4,
    outline: 'none'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
    borderBottom: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    pb: 2
  },
  closeButton: {
    color: 'white',
    '&:hover': {
      bgcolor: 'rgba(255,255,255,0.1)',
    },
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
    },
    '& .MuiInputBase-input': {
      color: 'white',
    },
    mb: 3
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
    mt: 3,
    pt: 3,
    borderTop: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  submitButton: {
    bgcolor: 'white',
    color: 'black',
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: 'rgba(255,255,255,0.9)',
    },
    '&:disabled': {
      bgcolor: 'rgba(255,255,255,0.5)',
      color: 'rgba(0,0,0,0.5)',
    },
  },
  cancelButton: {
    borderColor: 'rgba(255,255,255,0.3)',
    color: 'white',
    '&:hover': {
      borderColor: 'rgba(255,255,255,0.8)',
      bgcolor: 'rgba(255,255,255,0.05)',
    },
  }
} as const;