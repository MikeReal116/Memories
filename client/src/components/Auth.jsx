import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Input from './UI/Input';
import { googleLogin, login, signup } from '../redux/action';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  signIn: {
    textTransform: 'none'
  }
}));

const Auth = () => {
  const [signIn, setSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: ''
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const clientId = process.env.REACT_APP_CLIENT_ID;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const handleClickToggleSignIn = () => {
    setSignIn((prevValue) => !prevValue);
  };

  const onSuccess = async (res) => {
    const token = res?.tokenId;
    const profile = res?.profileObj;
    dispatch(googleLogin({ token, profile }));
    history.push('/');
  };

  const onFailure = (error) => {
    console.log(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signIn) {
      dispatch(
        login({ email: formData.email, password: formData.password }, history)
      );
    } else {
      dispatch(signup(formData, history));
    }
  };
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5' component='h1'>
          {signIn ? 'Sign in' : 'Sign up'}
        </Typography>
        <form
          noValidate
          autoComplete='off'
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            {!signIn && (
              <>
                <Input
                  name='firstName'
                  label='FirstName'
                  onChange={handleChange}
                  value={formData.firstName}
                  half
                />
                <Input
                  name='lastName'
                  label='LastName'
                  onChange={handleChange}
                  value={formData.lastName}
                  half
                />
              </>
            )}
            <Input
              name='email'
              label='Email'
              onChange={handleChange}
              value={formData.email}
            />
            <Input
              name='password'
              label='Password'
              onChange={handleChange}
              handleClickShowPassword={handleClickShowPassword}
              type={!showPassword ? 'password' : 'text'}
              value={formData.password}
            />
            {!signIn && (
              <Input
                name='repeatPassword'
                label='Repeat Password'
                onChange={handleChange}
                type='password'
              />
            )}
          </Grid>
          <Button
            variant='contained'
            type='submit'
            fullWidth
            color='primary'
            className={classes.submit}
          >
            {signIn ? 'Sign In' : 'Sign Up'}
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Button
                color='primary'
                className={classes.signIn}
                onClick={handleClickToggleSignIn}
              >
                {signIn
                  ? 'Sign Up for an account'
                  : 'Already have an account? Sign in'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
        onFailure={onFailure}
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            variant='contained'
            fullWidth
          >
            Login with Google
          </Button>
        )}
        cookiePolicy={'single_host_origin'}
      />
    </Container>
  );
};

export default Auth;
