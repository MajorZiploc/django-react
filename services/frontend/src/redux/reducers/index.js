import { combineReducers } from 'redux';
import countReducer from './countReducer';
// import authReducer from './auth';

const rootReducer = combineReducers({
  // auth: authReducer,
  count: countReducer,
});

export default rootReducer;
