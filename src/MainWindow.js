import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Switch, FormControlLabel, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { fin } from '@openfin/core';
import PieChartComponent from './components/PieChartComponent';
import RadialBarChartComponent from './components/RadialBarChartComponent';

const MainWindow = ({ createThirdWindow, createFourthWindow }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const initialIsDarkMode = storedTheme === 'dark';
    setIsDarkMode(initialIsDarkMode);

    if (typeof fin !== 'undefined') {
      fin.InterApplicationBus.publish('theme-change', { isDarkMode: initialIsDarkMode });
    }
  }, []);

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#ffffff',
        paper: '#f9f9f9',
      },
      text: {
        primary: '#333',
      },
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
      h1: {
        fontSize: '2rem',
        fontWeight: 600,
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 500,
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        // default: '#060b28f0',
        default: '#141b2d',
        paper: '#1e1e1e',
      },
      text: {
        primary: '#ffffff',
      },
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
      h1: {
        fontSize: '2rem',
        fontWeight: 600,
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 500,
      },
    },
  });

  const handleThemeChange = async (event) => {
    const newTheme = event.target.checked;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');

    if (typeof fin !== 'undefined') {
      fin.InterApplicationBus.publish('theme-change', { isDarkMode: newTheme });
    }
  };

  const pieData = [
    { id: 'AAPL', label: 'AAPL', value: 30, color: '#00BFFF' },
    { id: 'GOOG', label: 'GOOG', value: 50, color: '#FF6347' },
    { id: 'MSFT', label: 'MSFT', value: 20, color: '#32CD32' },
  ];

  const radialBarData = [
    {
      id: 'AAPL',
      data: [{ x: 'AAPL', y: 30 }],
    },
    {
      id: 'GOOG',
      data: [{ x: 'GOOG', y: 50 }],
    },
    {
      id: 'MSFT',
      data: [{ x: 'MSFT', y: 20 }],
    },
  ];

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div style={{ padding: '20px'}}>
        <Typography variant="h1">FinStock Insights v1.0</Typography>
        <Typography variant="h2" sx={{marginBottom: 2}}>Unified Analytics for Stock Market and Financial Data</Typography>

        {/* Theme switcher */}
        <FormControlLabel
          control={<Switch checked={isDarkMode} onChange={handleThemeChange} />}
          label="Dark Mode"
        />

        <Button variant="contained" color="primary" onClick={createThirdWindow}>
          Stock Data - Line Chart
        </Button>

        <Button variant="contained" color="primary" onClick={createFourthWindow} sx={{marginLeft: 2}}>
          Stock Live Ticker
        </Button>

        {/* Small Charts */}
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item xs={4}>
            <Card elevation={3} style={{ borderRadius: '10px', backgroundColor: isDarkMode ? '#00010a' : undefined }}>
              <CardContent>
                <PieChartComponent
                  data={pieData}
                  title="Stock Distribution 1"
                  subtext="Total: 100"
                  isDarkMode={isDarkMode}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card elevation={3} style={{ borderRadius: '10px', backgroundColor: isDarkMode ? '#00010a' : undefined }}>
              <CardContent>
                <PieChartComponent
                  data={pieData}
                  title="Stock Distribution 2"
                  subtext="Total: 100"
                  isDarkMode={isDarkMode}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card elevation={3} style={{ borderRadius: '10px', backgroundColor: isDarkMode ? '#00010a' : undefined }}>
              <CardContent>
                <RadialBarChartComponent
                  data={radialBarData}
                  title="Stock Performance"
                  subtext="Overview"
                  isDarkMode={isDarkMode}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default MainWindow;
