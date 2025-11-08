export const movieCardStyles = {
  card: {
    height: '420px',
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid #ffffff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    '&:hover': {
      boxShadow: '0 20px 25px rgba(255,255,255,0.3)',
      border: '2px solid #ffffff',
      transform: 'translateY(-5px)'
    },
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    bgcolor: 'transparent',
    overflow: 'hidden'
  },
  imageContainer: {
    position: 'relative', 
    width: '100%',
    height: '280px',
    overflow: 'hidden',
    flexShrink: 0
  },
  cardMedia: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
    opacity: 0,
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    pb: 3,
    '&:hover': {
      opacity: 1
    }
  },
  playButton: {
    bgcolor: 'white',
    transform: 'translateY(20px)',
    transition: 'all 0.3s ease',
    '&:hover': {
      bgcolor: 'white',
      transform: 'translateY(0) scale(1.1)'
    }
  },
  ratingBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    bgcolor: 'rgba(0,0,0,0.9)',
    backdropFilter: 'blur(10px)',
    px: 2,
    py: 1,
    borderRadius: 3,
    border: '2px solid rgba(255,255,255,0.4)'
  },
  cardContent: {
    p: 2, 
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    bgcolor: 'transparent'
  },
  title: {
    mb: 0.5,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    lineHeight: 1.3,
    height: '2.6em'
  },
  genreChip: {
    fontSize: '0.7rem',
    height: '24px',
    borderColor: 'white',
    color: 'white',
    bgcolor: 'transparent'
  },
  durationBox: {
    display: 'flex', 
    alignItems: 'center', 
    gap: 0.5, 
    mt: 'auto'
  }
} as const;