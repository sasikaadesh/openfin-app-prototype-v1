import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import StockTicker from './components/StockTicker';
import { fin } from '@openfin/core';

const FourthWindow = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load theme from localStorage when the window starts
    const storedTheme = localStorage.getItem('theme');
    const initialIsDarkMode = storedTheme === 'dark';
    setIsDarkMode(initialIsDarkMode);

    if (typeof fin !== 'undefined') {
      // Subscribe to theme-change messages
      fin.InterApplicationBus.subscribe({ uuid: '*' }, 'theme-change', (message) => {
        setIsDarkMode(message.isDarkMode);
      });
    }
  }, []);

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#f2f0f0',
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#060b28f0',
      },
    },
  });

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div style={{ padding: '20px' }}>
        <h1 className='line'>Real-Time Market Insights Ticker</h1>
        <StockTicker isDarkMode={isDarkMode} />
      </div>
    </ThemeProvider>
  );
};

export default FourthWindow;
