export const headerStyles = {
  appBar: {
    height: 100,
    bgcolor: 'black',
    borderBottom: '1px solid #ffffff',
    paddingLeft: { xs: '5%', md: '10%', lg: '15%' },
    paddingRight: { xs: '5%', md: '10%', lg: '15%' },
  },
  toolbar: {
    justifyContent: 'space-between',
    gap: 2,
    minHeight: '100px !important',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  icon: {
    color: 'primary.main',
    fontSize: 64,
  },
  title: {
    color: 'primary.main',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: { xs: '1.5rem', md: '2rem' },
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
  },
  authSection: {
    display: 'flex',
    gap: 3,
  },
  greeting: {
    color: 'white',
    fontSize: '1.2rem',
  },
  avatar: {
    width: 48,
    height: 48,
    bgcolor: 'primary.main',
    fontSize: '1.3rem',
  },
  button: {
    fontSize: '1.1rem',
    px: 4,
    py: 1,
  },
} as const;