// @ts-check
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Movies from './components/Movies';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { ErrorBoundary } from 'react-error-boundary';
import PrivateComponent from './components/PrivateComponent';

import { StyledEngineProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material';

import './App.scss';

const theme = createTheme();

const cache = createCache({
  key: 'css',
  prepend: true,
});

/**
 * @returns {React.ReactElement}
 */
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role='alert' className='errorContent'>
      <p className='errorHeading'>Something went wrong:</p>
      <p className='errorSubHeading'>{error.message}</p>
      <button onClick={resetErrorBoundary} className='errorButton'>
        Try again
      </button>
    </div>
  );
};

/**
 * @returns {React.ReactElement}
 */
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
              <Navbar />
              <Routes>
                <Route path='/' element={<PrivateComponent element={<Movies />} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/movies' element={<PrivateComponent element={<Movies />} />} />
                <Route path='*' element={<Navigate to='/' />} />
              </Routes>
            </ErrorBoundary>
          </ThemeProvider>
        </CacheProvider>
      </StyledEngineProvider>
    </React.Fragment>
  );
};

export default App;
