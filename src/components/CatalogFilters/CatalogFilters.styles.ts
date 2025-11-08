export const catalogFiltersStyles = {
  root: {
    bgcolor: '#000000',
    py: 2,
    paddingLeft: { xs: '1%', md: '3%', lg: '7%' },
    paddingRight: { xs: '1%', md: '3%', lg: '7%' }
  },
  container: {
    px: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  topRow: {
    display: 'flex', 
    alignItems: 'flex-start', 
    gap: 3,
    flexWrap: 'nowrap',
  },
  genresContainer: {
    display: 'flex', 
    flexWrap: 'wrap',
    gap: 1,
    flex: '1 1 auto',
    minHeight: '64px',
    alignContent: 'flex-start',
  },
  actionsContainer: {
    display: 'flex',
    gap: 3,
    flexShrink: 0,
    alignItems: 'flex-start',
  },
  addButton: {
    color: 'white',
    borderColor: 'white',
    minWidth: '200px',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    '&:hover': {
      borderColor: 'primary.main'
    }
  },
  searchField: {
    width: 250,
    minWidth: 200,
    flexShrink: 0,
    '& .MuiOutlinedInput-root': {
      bgcolor: '#000000',
      borderRadius: 2,
      border: '1px solid #ffffff',
      '&:hover': {
        borderColor: '#ffffff',
        borderWidth: '1px'
      },
      '&.Mui-focused': {
        borderColor: '#ffffff',
        borderWidth: '1px'
      }
    },
    '& .MuiInputBase-input': {
      color: '#ffffff',
      '&::placeholder': {
        color: '#ffffff',
        opacity: 1
      }
    }
  },
  chip: {
    borderRadius: 2,
    fontSize: '0.875rem',
    borderColor: '#ffffff',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: 1
    },
    transition: 'all 0.2s ease',
    flexShrink: 0
  }
} as const;