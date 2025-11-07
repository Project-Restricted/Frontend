import { Box, Typography } from '@mui/material';

const FOOTER_STYLES = {
  root: {
    borderTop: '1px solid #ffffff',
    py: 4,
    mt: 8,
    bgcolor: 'black',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    variant: 'body2' as const,
    color: 'white',
    align: 'center' as const,
    textAlign: 'center' as const,
  }
} as const;

const COPYRIGHT_TEXT = '© 2025 Project Restricted. Все фильмы предоставляются легально и бесплатно.';

export const Footer = () => {
  return (
    <Box component="footer" sx={FOOTER_STYLES.root}>
      <Typography sx={FOOTER_STYLES.text}>
        {COPYRIGHT_TEXT}
      </Typography>
    </Box>
  );
};