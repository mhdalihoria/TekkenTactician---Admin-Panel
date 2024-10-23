import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize your primary color here
    },
    secondary: {
      main: '#ff4081', // Customize your secondary color here
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Set your typography
  },
});

export default theme;
