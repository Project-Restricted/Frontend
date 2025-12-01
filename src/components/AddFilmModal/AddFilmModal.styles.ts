export const addFilmModalStyles = {
  formContainer: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflowY: 'auto',
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

  row: {
    display: 'flex',
    gap: 2,
    mb: 2,
    '& > *': {
      flex: 1,
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
    '& .MuiFormHelperText-root': {
      color: 'rgba(255,255,255,0.5)',
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'rgba(255,255,255,0.5)',
      opacity: 1,
    },
  },

  selectField: {
    mb: 2,
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
      minHeight: 'unset',
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255,255,255,0.7)',
    },
    '& .MuiSelect-select': {
      color: 'white',   
      padding: '16.5px 14px',    
      minHeight: 'unset',
      display: 'flex',
      alignItems: 'center',      
      boxSizing: 'border-box',
    },  
    '& .MuiSelect-multiple': {
      padding: '16.5px 14px',      
      minHeight: '56px',
      height: 'auto',
    },
  },

  menuPaper: {
    bgcolor: '#000000',
    border: '1px solid rgba(255,255,255,0.3)',
    '& .MuiMenuItem-root': {
      color: 'white',
      '&:hover': {
        bgcolor: 'rgba(255,255,255,0.1)',
      },
      '&.Mui-selected': {
        bgcolor: 'rgba(255,255,255,0.2)',
      },
    },
  },

  selectLabel: {
    color: 'rgba(255,255,255,0.7) !important',
  },

  selectedValues: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.5,
    minHeight: '24px',
    alignItems: 'center',
  },

  fieldContainer: {
    mb: 2,
  },

  chipInputContainer: {
    display: 'flex',
    gap: 1,
    alignItems: 'flex-start',
    '& .MuiTextField-root': {
      flex: 1,
    },
  },

  addButton: {
    borderColor: 'rgba(255,255,255,0.3)',
    color: 'white',
    minWidth: '56px',
    width: '56px',
    height: '56px',
    padding: 0,
    marginTop: '16px',
    flexShrink: 0,
    '&:hover': {
      borderColor: 'rgba(255,255,255,0.8)',
      bgcolor: 'rgba(255,255,255,0.05)',
    },
    '&:disabled': {
      borderColor: 'rgba(255,255,255,0.2)',
      color: 'rgba(255,255,255,0.3)',
    },
  },
  
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.5,
    mt: 1,
  },

  chip: {
    bgcolor: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.3)',
    height: '32px',
    '& .MuiChip-deleteIcon': {
      color: 'white',
      '&:hover': {
        color: 'rgba(255,255,255,0.8)',
      },
    },
  },

  tagChip: {
    bgcolor: 'rgba(156, 39, 176, 0.3)',
    color: 'white',
    border: '1px solid rgba(156, 39, 176, 0.5)',
    height: '32px',
    '& .MuiChip-deleteIcon': {
      color: 'white',
      '&:hover': {
        color: 'rgba(255,255,255,0.8)',
      },
    },
  },

  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
    mt: 4,
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
    '&:disabled': {
      borderColor: 'rgba(255,255,255,0.2)',
      color: 'rgba(255,255,255,0.3)',
    },
  },
} as const;