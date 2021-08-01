import { createTheme } from '@material-ui/core/styles';

export const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: 'rgb(22,88,142)',
      dark: '#C82D2B',
    },
    secondary: {
      main: '#81C4FF',
    },
    action: {
      selected: '#FFB421',
    },
  },
  typography: {
    fontFamily: '"Cabin", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightRegular: 600,
  },
});

export const lightTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#FFB421',
      dark: '#000000',
    },
    secondary: {
      main: '#B2B2B2',
    },
    action: {
      selected: '#96B721',
      color: '#000000',
    },
  },
  typography: {
    fontFamily: '"Cabin", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightRegular: 600,
  },
});
