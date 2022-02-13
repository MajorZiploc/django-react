import React from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import DataContext from '../context/DataContext';

const useStyles = makeStyles(theme => ({
  form: {
    maxWidth: '330px',
    marginTop: '0',
    marginBottom: '0',
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    padding: '20px',
    marginTop: '30px',
  },
  textField: {
    minWidth: 130,
    margin: theme.spacing(1),
  },
}));

function Login() {
  const [loginCreds, setLoginCreds] = React.useState({ email: '', username: '', password: '', password2: '' });
  const [isRegister, setIsRegister] = React.useState(false);
  const classes = useStyles();
  const data = React.useContext(DataContext);

  function LoginAttempt(_e) {
    if ([loginCreds.username, loginCreds.password].every(c => c)) {
      data.login(loginCreds.username, loginCreds.password);
    }
    // TODO: if login attemp fails, then give an alert
  }

  function RegisterAttempt(_e) {
    if ([loginCreds.email, loginCreds.username, loginCreds.password, loginCreds.password2].every(c => c)) {
      if (loginCreds.password === loginCreds.password2) {
        data.register(loginCreds.email, loginCreds.username, loginCreds.password);
      }
      // TODO: if passwords do not match. show an alert
    }
  }

  function onChange(e) {
    setLoginCreds({ ...loginCreds, [e.currentTarget.id]: e.currentTarget.value });
  }

  return (
    <form className={classes.form}>
      {isRegister && (
        <TextField
          className={classes.textField}
          label='Email'
          id='email'
          variant='outlined'
          size='small'
          onChange={e => onChange(e)}
        />
      )}
      <TextField
        className={classes.textField}
        label='Username'
        id='username'
        variant='outlined'
        size='small'
        onChange={e => onChange(e)}
      />
      <TextField
        className={classes.textField}
        label='Password'
        id='password'
        variant='outlined'
        size='small'
        onChange={e => onChange(e)}
        type='password'
      />
      {isRegister && (
        <TextField
          className={classes.textField}
          label='Retype password'
          id='password2'
          variant='outlined'
          size='small'
          onChange={e => onChange(e)}
        />
      )}
      {isRegister ? (
        <Button type='button' color='primary' onClick={e => RegisterAttempt(e)}>
          Register
        </Button>
      ) : (
        <Button type='button' color='primary' onClick={e => LoginAttempt(e)}>
          Log in
        </Button>
      )}
      {isRegister ? (
        <Button type='button' color='primary' onClick={_e => setIsRegister(false)}>
          Have an account?
        </Button>
      ) : (
        <Button type='button' color='primary' onClick={_e => setIsRegister(true)}>
          Dont have an account?
        </Button>
      )}
    </form>
  );
}

export default Login;
