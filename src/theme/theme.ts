import { createTheme } from '@mui/material';

const COLORS = {
  WHITE: '#ffffff',
  BLACK: '#000000', 
  GRAY: '#cccccc',
};

const FONT_FAMILY = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
].join(',');

export const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.WHITE,
      contrastText: COLORS.WHITE,
    },
    background: {
      default: COLORS.BLACK,
      paper: COLORS.WHITE,
    },
    text: {
      primary: COLORS.WHITE,
      secondary: COLORS.WHITE,
    },
  },
  typography: {
    fontFamily: FONT_FAMILY,
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          background: COLORS.BLACK,
          border: `2px solid ${COLORS.WHITE}`,
          color: COLORS.WHITE,
          '&:hover': {
            border: `2px solid ${COLORS.WHITE}`,
            color: COLORS.GRAY,
          },
        },
      },
    },
  },
});