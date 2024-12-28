import React from 'react';
import './App.css';
import Routing from './components/Routing';
import 'bootstrap/dist/css/bootstrap.css';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import ThemeProvider and createTheme

// Create a custom theme using MUI's createTheme function
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Custom primary color
    },
    secondary: {
      main: '#808080', // Custom secondary color
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {' '}
      {/* Wrap the Routing component with ThemeProvider */}
      <div className="App m-1">
        <Routing />
      </div>
    </ThemeProvider>
  );
}

export default App;
