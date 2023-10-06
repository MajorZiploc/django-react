import { configureStore } from '@reduxjs/toolkit';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createOidcMiddleware, { loadUser } from 'redux-oidc';
import logger from 'redux-logger';
import rootReducer from './reducers';
import userManager from '../userManager';

const preloadedState = {};

const store = configureStore({
  reducer: {
    rootReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});

// const oidcMiddleware = createOidcMiddleware(userManager);
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(oidcMiddleware)),
// );
loadUser(store, userManager);

export default store;
