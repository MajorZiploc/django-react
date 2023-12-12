// @ts-check
import React from 'react';
import { Button, TextField, Snackbar, Alert } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Navigate } from 'react-router-dom';
import * as data from '../data';
import { getAccessToken, toKeyValArray } from '../utils';
import '../styles/Global.scss';
import '../styles/Login.scss';
// import { useSelector } from 'react-redux';
// import { selectCount } from '../redux/slices/counterSlice';

/**
 * @typedef {import('../interfaces').AlertSettings} AlertSettings
 */

/**
 * @returns {React.ReactElement}
 */
const Login = () => {
  const [loginCreds, setLoginCreds] = React.useState({
    email: '',
    username: '',
    password: '',
    password2: '',
    firstName: '',
    lastName: '',
  });
  const [isRegister, setIsRegister] = React.useState(false);
  const [isLogined, setIsLogined] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isRePasswordVisible, setIsRePasswordVisible] = React.useState(false);
  /** @type {import('../interfaces').useState<AlertSettings>} */
  const [alertSettings, setAlertSettings] = React.useState({
    display: false,
    message: '',
    severity: 'error',
  });
  // const count = useSelector(selectCount);

  const openAlert = alertSettings => {
    setAlertSettings(alertSettings);
  };

  const closeAlert = () => {
    setAlertSettings({ display: false, message: alertSettings?.message, severity: alertSettings?.severity });
  };

  const LoginAttempt = async _e => {
    if ([loginCreds.username, loginCreds.password].every(c => c)) {
      await data
        .login(loginCreds.username, loginCreds.password)
        .catch(_e =>
          openAlert({ display: true, message: 'Login failed, check your username and password', severity: 'error' })
        );
      if (getAccessToken()) {
        setIsLogined(true);
      }
    } else {
      const errorMessage = `Missing the following fields: ${toKeyValArray(loginCreds)
        .filter(kv => ['username', 'password'].includes(kv.key))
        .filter(kv => !kv.value)
        .map(kv => kv.key)
        .join(', ')}`;
      openAlert({ display: true, message: errorMessage, severity: 'error' });
    }
  };

  const RegisterAttempt = async _e => {
    if (toKeyValArray(loginCreds).every(c => c.value)) {
      if (loginCreds.password === loginCreds.password2) {
        await data
          .register(
            loginCreds.email,
            loginCreds.username,
            loginCreds.password,
            loginCreds.firstName,
            loginCreds.lastName
          )
          .then(_v => {
            openAlert({
              display: true,
              message: 'Registration successful! Please Login',
              severity: 'success',
            });
            setIsRegister(false);
          })
          .catch(err => {
            /** @type{JSX.Element | null | string} */
            let message = 'Registration Failed: check your form information';
            if (err?.response?.data) {
              /** @type{{key: string, content: string[]}[]} */
              const issues = Object.keys(err.response.data).map(key => ({ key, content: err.response.data[key] }));
              const title = `Registration Failed with the following issue${
                issues.reduce((acc, i) => acc + i.content.length, 0) === 1 ? '' : 's'
              }:`;
              message = (
                <div>
                  {' '}
                  {title}
                  <ul>
                    {issues.map(issue => (
                      <li key={issue.key} style={{ textAlign: 'left' }}>
                        <div>
                          {issue.key}
                          <ul>
                            {issue.content.map(point => (
                              <li className='login-issue-point' key={point}>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
            openAlert({
              display: true,
              message,
              severity: 'error',
            });
          });
      } else {
        const errorMessage = `Passwords do not match`;
        openAlert({ display: true, message: errorMessage, severity: 'error' });
      }
    } else {
      const errorMessage = `Missing the following fields: ${toKeyValArray(loginCreds)
        .filter(kv => !kv.value)
        .map(kv => kv.key)
        .join(', ')}`;
      openAlert({ display: true, message: errorMessage, severity: 'error' });
    }
  };

  const onFormSubmit = async e => {
    e.preventDefault();
    if (isRegister) {
      await RegisterAttempt(e);
    } else {
      await LoginAttempt(e);
    }
  };

  const onChange = e => {
    setLoginCreds({ ...loginCreds, [e.currentTarget.id]: e.currentTarget.value });
  };

  return isLogined ? (
    <Navigate to='/movies' />
  ) : (
    <div className='background'>
      <div className='pageStyles'>
        <Snackbar
          id='loginPageAlertSnackbar'
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={alertSettings?.display}
          onClose={closeAlert}
          className='alertBox'
        >
          <Alert onClose={closeAlert} severity={alertSettings?.severity}>
            {alertSettings?.message}
          </Alert>
        </Snackbar>
        {/* <p>Redux count: {count}</p> */}
        <form noValidate={true} id='loginPageForm' onSubmit={onFormSubmit} className='loginForm'>
          {isRegister && (
            <>
              <TextField
                className='loginTextField'
                label='Email'
                id='email'
                variant='outlined'
                size='small'
                onChange={e => onChange(e)}
              />
              <TextField
                className='loginTextField'
                label='First Name'
                id='firstName'
                variant='outlined'
                size='small'
                onChange={e => onChange(e)}
              />
              <TextField
                className='loginTextField'
                label='Last Name'
                id='lastName'
                variant='outlined'
                size='small'
                onChange={e => onChange(e)}
              />
            </>
          )}
          <TextField
            className='loginTextField'
            label='Username'
            id='username'
            variant='outlined'
            size='small'
            onChange={e => onChange(e)}
          />
          <div style={{ display: 'flex' }}>
            <TextField
              className='loginPasswordField'
              label='Password'
              id='password'
              variant='outlined'
              size='small'
              onChange={e => onChange(e)}
              type={isPasswordVisible ? 'text' : 'password'}
            />
            {isPasswordVisible ? (
              <VisibilityOffIcon
                className='login-eye-styles'
                onClick={() => setIsPasswordVisible(false)}
                id='visibility-off-icon'
                color='primary'
              />
            ) : (
              <VisibilityIcon
                className='login-eye-styles'
                onClick={() => setIsPasswordVisible(true)}
                id='visibility-icon'
                color='primary'
              />
            )}
          </div>
          {isRegister && (
            <div style={{ display: 'flex' }}>
              <TextField
                className='loginPasswordField'
                label='Retype password'
                id='password2'
                variant='outlined'
                size='small'
                onChange={e => onChange(e)}
                type={isRePasswordVisible ? 'text' : 'password'}
              />
              {isRePasswordVisible ? (
                <VisibilityOffIcon
                  className='login-eye-styles'
                  onClick={() => setIsRePasswordVisible(false)}
                  id='visibility-off-icon'
                  color='primary'
                />
              ) : (
                <VisibilityIcon
                  className='login-eye-styles'
                  onClick={() => setIsRePasswordVisible(true)}
                  id='visibility-icon'
                  color='primary'
                />
              )}
            </div>
          )}
          <Button id='logInButton' type='submit' color='primary'>
            {isRegister ? 'Register' : 'Log in'}
          </Button>
          {isRegister ? (
            <Button id='haveAnAccountButton' type='button' color='primary' onClick={_e => setIsRegister(false)}>
              Have an account?
            </Button>
          ) : (
            <Button id='dontHaveAnAccountButton' type='button' color='primary' onClick={_e => setIsRegister(true)}>
              Dont have an account?
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
