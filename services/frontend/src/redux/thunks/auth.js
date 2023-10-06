import { userSignIn, userSignOut } from 'redux-oidc';

// const baseUrl = `${process.env.REACT_APP_PUBLIC_URL}:${process.env.REACT_APP_BACKEND_PORT}`;

// export const login = (username, password) => async dispatch => {
//   try {
//     const response = axios.post(
//       baseUrl + '/api/v1/auth/token/',
//       {
//         username: username,
//         password: password,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//       }
//     );
//     const token = response.data.access;
//     const refreshToken = response.data.refresh;
//     localStorage.setItem('token', token);
//     dispatch({ type: 'setToken', payload: token });
//     // dispatch(fetchUser());
//   } catch (error) {
//     console.error('Login failed:', error);
//   }
// };

// // export const fetchUser = () => async (dispatch) => {
// //   try {
// //     const response = await axios.get('/api/user/');
// //     const user = response.data;
// //     dispatch({ type: 'SET_USER', payload: user });
// //   } catch (error) {
// //     console.error('Error fetching user data:', error);
// //   }
// // };

// export const logout = () => dispatch => {
//   localStorage.removeItem('token');
//   dispatch({ type: 'LOGOUT' });
// };

export const signIn = () => async (dispatch) => {
  try {
    await dispatch(userSignIn());
  } catch (error) {
    console.error('Error signing in:', error);
  }
};

export const signOut = () => async (dispatch) => {
  try {
    await dispatch(userSignOut());
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
