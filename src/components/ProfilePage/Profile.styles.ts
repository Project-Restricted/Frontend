export const profileStyles = {
  container: {
    minHeight: '100vh', 
    bgcolor: 'black', 
    color: 'white',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    py: 4
  },
  backButton: {
    color: 'white', 
    mb: 4,
    border: '1px solid #ffffff',
    minWidth: '180px',
    alignSelf: 'flex-start',
    '&:hover': {
      border: '1px solid rgba(255,255,255,0.6)',
      bgcolor: 'rgba(255,255,255,0.1)'
    }
  },
  paper: {
    bgcolor: '#000000',
    backdropFilter: 'blur(10px)',
    borderRadius: 3,
    p: { xs: 3, md: 4 },
    border: '1px solid #ffffff',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    width: '100%'
  },
  layout: {
    display: 'flex', 
    gap: 4, 
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: { xs: 'center', md: 'flex-start' }
  },
  avatarSection: {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    gap: 2,
    minWidth: 200
  },
  avatar: {
    width: 120, 
    height: 120, 
    bgcolor: 'primary.main',
    fontSize: '3rem',
    border: '3px solid #ffffff',
    boxShadow: '0 8px 25px rgba(0,0,0,0.8)'
  },
  username: {
    fontWeight: 'bold',
    textAlign: 'center',
    background: 'linear-gradient(45deg, #fff, #aaa)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent'
  },
  userBadge: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    backgroundColor: 'black',
    fontSize: '1rem',
    height: '20px',
    padding: '0 16px',
    borderRadius: '20px'
  },
  moderatorBadge: {
    display: 'flex',
    alignItems: 'center',
    color: '#FF6B35',
    backgroundColor: 'black',
    fontSize: '1rem',
    height: '20px',
    padding: '0 16px',
    borderRadius: '20px'
  },
  content: {
    flex: 2, 
    display: 'flex', 
    flexDirection: 'column', 
    gap: 4
  },
  infoItem: {
    display: 'flex', 
    alignItems: 'center', 
    gap: 2
  },
  sectionTitle: {
    color: 'white', 
    mb: 3
  },
  statsContainer: {
    display: 'flex', 
    gap: 4, 
    justifyContent: { xs: 'center', md: 'flex-start' },
    alignItems: 'flex-start'
  },
  statItem: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '80px'
  },
  statValue: {
    color: 'primary.main', 
    fontWeight: 'bold'
  },
  ratingValue: {
    color: 'warning.main', 
    fontWeight: 'bold'
  },
  actionsContainer: {
    display: 'flex', 
    gap: 2, 
    justifyContent: { xs: 'center', md: 'flex-start' }, 
    flexWrap: 'wrap', 
    mt: 2
  },
  moderatorButton: {
    color: 'warning.main',
    borderColor: 'warning.main',
    '&:hover': {
      borderColor: 'warning.light',
      bgcolor: 'rgba(255,167,38,0.1)'
    }
  },
  editButton: {
    color: 'white',
    borderColor: 'white',
    '&:hover': {
      borderColor: 'rgba(255, 255, 255, 0.6)',
      bgcolor: 'rgba(255,255,255,0.1)'
    }
  }
} as const;