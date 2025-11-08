export const videoPlayerStyles = {
  paper: {
    bgcolor: '#000000',
    backdropFilter: 'blur(10px)',
    borderRadius: 3,
    p: 3,
    border: '1px solid #ffffff',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    mb: 4,
    width: '100%'
  },
  videoContainer: {
    position: 'relative',
    width: '100%', 
    height: { xs: '300px', sm: '400px', md: '500px' },
    borderRadius: 2,
    overflow: 'hidden',
    bgcolor: '#000',
    cursor: 'pointer'
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 2,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  playButton: {
    bgcolor: 'primary.main',
    width: 80,
    height: 80,
    '&:hover': {
      bgcolor: 'white',
      transform: 'scale(1.1)'
    },
    transition: 'all 0.3s ease'
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 10
  }
} as const;