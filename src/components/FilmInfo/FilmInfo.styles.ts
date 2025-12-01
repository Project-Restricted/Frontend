export const filmInfoStyles = {
  paper: {
    bgcolor: '#000000',
    backdropFilter: 'blur(10px)',
    borderRadius: 3,
    p: { xs: 3, md: 4 },
    border: '1px solid #ffffff',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    mb: 4,
    width: '100%'
  },
  container: {
    display: 'flex', 
    gap: 4, 
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: { xs: 'center', md: 'flex-start' }
  },
  poster: {
    flex: 1,
    display: 'flex', 
    justifyContent: 'center',
    maxWidth: { xs: '250px', md: '300px' }
  },
  content: {
    flex: 2, 
    textAlign: { xs: 'center', md: 'left' }
  },
  title: {
    fontSize: { xs: '2rem', md: '2.5rem' },
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #fff, #aaa)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    mb: 3
  },
  genreChip: {
    bgcolor: '#000000', 
    color: '#ffffff', 
    border: '1px solid #ffffff',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    px: 2,
    py: 1,
    '&:hover': {
      bgcolor: 'rgba(255,255,255,0.1)'
    }
  },
  tagsSection: {
    mb: 4
  },
  tagsHeader: {
    display: 'flex', 
    alignItems: 'center', 
    gap: 1, 
    mb: 2, 
    flexWrap: 'wrap'
  },
  tagsTitle: {
    mr: 1, 
    color: '#ffffff'
  },
  addTagButton: {
    color: 'primary.main',
    border: '1px solid',
    borderColor: 'primary.main',
    minWidth: '130px',
    '&:hover': {
      color: 'rgba(255,255,255,0.8)'
    }
  },
  tagsContainer: {
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: 1,
    maxHeight: '80px',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease'
  },
  tagsContainerExpanded: {
    maxHeight: 'none'
  },
  tagChip: {
    borderColor: 'rgba(255,255,255,0.3)',
    color: 'rgba(255,255,255,0.9)',
    bgcolor: 'rgba(255,255,255,0.1)',
    '&:hover': {
      bgcolor: 'rgba(255,255,255,0.2)',
      borderColor: 'rgba(255,255,255,0.5)'
    }
  },
  showMoreButton: {
    color: 'primary.main',
    mt: 1,
    fontSize: '0.875rem'
  },
  actorsSection: {
    mb: 4
  },
  actorsHeader: {
    display: 'flex', 
    alignItems: 'center', 
    gap: 1, 
    mb: 2
  },
  actorsTitle: {
    color: '#ffffff'
  },
  actorsContainer: {
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: 1
  },
  actorChip: {
    borderColor: 'rgba(255,255,255,0.3)',
    color: 'rgba(255,255,255,0.9)',
    bgcolor: 'rgba(255,255,255,0.1)',
    '&:hover': {
      bgcolor: 'rgba(255,255,255,0.2)',
      borderColor: 'rgba(255,255,255,0.5)'
    }
  },
  ratingSection: {
    display: 'flex', 
    flexDirection: 'column', 
    gap: 3
  },
  ratingItem: {
    display: 'flex', 
    alignItems: 'center', 
    gap: 2, 
    justifyContent: { xs: 'center', md: 'flex-start' }
  },
  ratingButton: {
    color: 'white',
    borderColor: 'primary.main',
    minWidth: '80px',
    '&:hover': {
      borderColor: 'primary.main'      
    }
  },
  metaSection: {
    display: 'flex', 
    flexDirection: 'column', 
    gap: 3
  },
  metaItem: {
    display: 'flex', 
    alignItems: 'center', 
    gap: 2, 
    justifyContent: { xs: 'center', md: 'flex-start' }
  },
  description: {
    color: 'white',
    lineHeight: 1.6,
    mt: 2
  }
} as const;