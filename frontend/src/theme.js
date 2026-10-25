// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#22c55e',
      contrastText: '#0b0b0b',
    },
    secondary: {
      main: '#3f3f46',
    },
    background: {
      default: '#0b0b0b',
      paper: '#141414',
    },
    text: {
      primary: '#e5e5e5',
      secondary: '#a1a1aa',
    },
    error: {
      main: '#ef4444',
    },
    success: {
      main: '#22c55e',
    },
    divider: '#27272a',
  },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid #27272a',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#141414',
          border: '1px solid #27272a',
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          padding: '12px 24px',
          borderRadius: 12,
        },
        containedPrimary: {
          color: '#0b0b0b',
          '&:hover': {
            opacity: 0.9,
          },
        },
        outlined: {
          borderColor: '#27272a',
          color: '#a1a1aa',
          '&:hover': {
            borderColor: '#3f3f46',
            backgroundColor: 'rgba(255,255,255,0.03)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#0a0a0a',
            borderRadius: 12,
            '& fieldset': {
              borderColor: '#27272a',
            },
            '&:hover fieldset': {
              borderColor: '#3f3f46',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#22c55e',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#52525b',
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          },
          '& .MuiInputBase-input': {
            color: '#e5e5e5',
          },
        },
      },
    },
  },
});

export default theme;