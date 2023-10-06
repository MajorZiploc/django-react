// @ts-check
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Movies from './components/Movies';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { ErrorBoundary } from 'react-error-boundary';
import { DataProvider } from './context/DataContext';
import { data } from './data';
import PrivateComponent from './components/PrivateComponent';

import { StyledEngineProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material';

import './App.scss';
import { useDispatch } from 'react-redux';
// import { incrementByAmount } from './redux/reducers/countReducer';
import { UserManager, WebStorageStateStore } from 'oidc-client';
import oidcConfig from './oidcConfig';

const userManager = new UserManager({
  ...oidcConfig,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
});

// // Initialize the OIDC client
// userManager.signinSilentCallback(); // Handles silent token renewal
// userManager.signinRedirectCallback(); // Handles redirects after login

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
  const dispatch = useDispatch();
  // dispatch(incrementByAmount(10));
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
