import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Input from './UI/Input';

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
  const classes = useStyles();

  const handleChange = () => {};

  const handleClickShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const handleClickToggleSignIn = () => {
    setSignIn((prevValue) => !prevValue);
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
        <form noValidate autoComplete='off' className={classes.form}>
          <Grid container spacing={2}>
            {!signIn && (
              <>
                <Input
                  name='firstName'
                  label='FirstName'
                  onChange={handleChange}
                  half
                />
                <Input
                  name='lastName'
                  label='LastName'
                  onChange={handleChange}
                  half
                />
              </>
            )}
            <Input name='email' label='Email' onChange={handleChange} />
            <Input
              name='password'
              label='Password'
              onChange={handleChange}
              handleClickShowPassword={handleClickShowPassword}
              type={!showPassword ? 'password' : 'text'}
            />
            {!signIn && (
              <Input
                name='repeatPassword'
                label='Repeat Password'
                onChange={handleChange}
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
    </Container>
  );
};

export default Auth;
