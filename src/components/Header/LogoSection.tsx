import { Box, Typography } from '@mui/material';
import { Movie } from '@mui/icons-material';
import { headerStyles } from './Header.styles';

export const LogoSection = () => {
  return (
    <Box sx={headerStyles.logoSection}>
      <Movie sx={headerStyles.icon} />
      <Typography variant="h4" component="h1" sx={headerStyles.title}>
        Project Restricted
      </Typography>
    </Box>
  );
};