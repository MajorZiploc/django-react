import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    // user: null,
  },
  reducers: {
    setToken: state => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    // setUser: state => {
    //   state.user = action.payload;
    // },
    logOut: (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
      // state.user = null;
    },
  },
});

export const {
  setToken,
  // setUser,
  logOut,
} = authSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const selectToken = state => state.token;

export default authSlice.reducer;
