import { createTheme } from '@mui/material'
import { blue, red, yellow } from '@mui/material/colors'

export const theme = createTheme({
  typography: {
    fontFamily: ['-apple-system', 'Montserrat'].join(','),
    fontWeightRegular: '500',
    h5: {
      fontWeight: '600',
    },
  },
  palette: {
    primary: {
      light: blue[700],
      main: blue[800],
      dark: blue[900],
      contrastText: blue[50],
    },
    secondary: {
      light: red[700],
      main: red[800],
      dark: red[900],
      contrastText: red[50],
    },
    info: {
      light: yellow[700],
      main: yellow[800],
      dark: yellow[900],
      contrastText: yellow[50],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          paddingLeft: '16px',
          paddingRight: '16px',
          boxShadow: '0 0px 8px rgba(0, 0, 0, .30)',
          borderRadius: '20px',
          backgroundColor: blue[800],
          '&.Mui-disabled': {
            backgroundColor: '#c5c5c5',
            color: '#262626',
          },
          '&:hover': {
            backgroundColor: blue[700],
          },
          '&.Mui-disabled:hover': {
            cursor: 'not-allowed',
          },
          '&.MuiButton-outlined': {
            border: 'none',
            background: 'transparent',
            color: 'black',
          },
          '&.MuiButton-outlinedPrimary': {
            border: 'none',
            background: blue[700],
            color: 'white',
          },
          '&.MuiButtonGroup-grouped': {
            borderRadius: '2px',
          },
          '&.MuiButton-outlined:hover': {
            border: 'none',
            boxShadow: '0 0px 6px rgba(0, 0, 0, .60)',
            background: '#f1f1f1',
            color: 'black',
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          backgroundColor: 'hsla(0,0%,0%,0.01)',
        },
      },
    },
  },
})
