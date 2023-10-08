// @ts-check
import { createSlice } from '@reduxjs/toolkit';

/**
 * @typedef {import('../../interfaces').ReduxState} ReduxState
 * @typedef {import('../../interfaces').CounterState} CounterState
 * @typedef {import('../../interfaces').Dispatch} Dispatch
 */

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Similar pattern for calling apis can be used
/** @type {(amount: number) => (dispatch: Dispatch) => void} */
export const incrementByAmountAsync = amount => dispatch => {
  return new Promise(resolve => {
    setTimeout(() => {
      dispatch(incrementByAmount(amount));
      resolve();
    }, 1000); // Simulating an async operation with a setTimeout
  });
};

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.count.value)`
/** @type {(state: ReduxState) => CounterState['value']} */
export const selectCount = state => state.counter.value;

export default counterSlice.reducer;
