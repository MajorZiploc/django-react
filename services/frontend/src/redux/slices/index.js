import { combineReducers } from 'redux';
import counterSlice from './counterSlice';

const rootReducer = combineReducers({
  counter: counterSlice,
});

export default rootReducer;
