import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Movies from './components/Movies';
import Movies2 from './components/Movies2';
import Navbar from './components/Navbar';
import { ErrorBoundary } from 'react-error-boundary';
import { DataProvider } from './context/DataContext';
import { data } from './data';
import { makeStyles } from '@material-ui/core/styles';

import './App.css';

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

function ErrorFallback({ error, resetErrorBoundary }) {
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
}

function App() {
  return (
    <React.Fragment>
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
            <Route path='/' element={<Movies2 />} />
            <Route path='/movies' element={<Movies />} />
          </Routes>
        </DataProvider>
      </ErrorBoundary>
    </React.Fragment>
  );
}

export default App;
