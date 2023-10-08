import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';
import logger from 'redux-logger';

const preloadedState = {};

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});
