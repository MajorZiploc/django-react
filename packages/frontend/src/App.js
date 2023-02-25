import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Movies from './components/Movies';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { ErrorBoundary } from 'react-error-boundary';
import { DataProvider } from './context/DataContext';
import { data } from './data';
import { makeStyles } from '@mui/styles';
import PrivateComponent from './components/PrivateComponent';

import { StyledEngineProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material';

import './App.css';

const theme = createTheme();

const cache = createCache({
  key: 'css',
  prepend: true,
});

const useStyles = makeStyles(_theme => ({
  errorContent: {
    'position': 'relative',
    'padding': '1rem',
    'margin': 'o auto',
    '&:before': {
      content: "''",
      position: 'absolute',
      height: '100%',
      border: '1px solid tan',
      right: '40px',
      top: 0,
    },
  },
  errorHeading: {
    color: 'tomato',
    padding: '3rem 0',
    textTransform: 'uppercase',
    fontSize: 24,
  },
  errorSubHeading: {
    color: '#fff',
    padding: 0,
    textTransform: 'uppercase',
    fontSize: 22,
    inlineSize: '400px',
    overflowWrap: 'break-word',
  },
  errorButton: {
    fontSize: 22,
  },
}));

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const classes = useStyles();
  return (
    <div role='alert' className={`${classes.errorContent}`}>
      <p className={classes.errorHeading}>Something went wrong:</p>
      <p className={classes.errorSubHeading}>{error.message}</p>
      <button onClick={resetErrorBoundary} className={classes.errorButton}>
        Try again
      </button>
    </div>
  );
};

const App = () => {
  return (
    <React.Fragment>
      <StyledEngineProvider injectFirst>
        <CacheProvider value={cache}>
          <ThemeProvider theme={theme}>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => {
                // reset the state of your app so the error doesn't happen again
              }}
            >
              <CssBaseline />
              <DataProvider value={data}>
                <Navbar />
                <Routes>
                  <Route path='/' element={<Login />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/movies' element={<PrivateComponent element={<Movies />} />} />
                  <Route path='*' element={<Navigate to='/' />} />
                </Routes>
              </DataProvider>
            </ErrorBoundary>
          </ThemeProvider>
        </CacheProvider>
      </StyledEngineProvider>
    </React.Fragment>
  );
};

export default App;
