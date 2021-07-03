import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MemoryIcon from '@material-ui/icons/Memory';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { logout } from '../redux/action';

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: '#fff',
    textDecoration: 'none'
  },
  avatar: {
    margin: theme.spacing(1)
  },
  profile: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
      }
    }
  }, [dispatch, user?.token]);

  const handleClickLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar>
        <MemoryIcon />
        <Typography
          variant='h6'
          className={classes.title}
          component={Link}
          to={'/'}
        >
          Memories
        </Typography>
        <div className={classes.profile}>
          {user && <Typography>{user.profile.givenName}</Typography>}
          {user && (
            <Avatar
              className={classes.avatar}
              src={user.profile.imageUrl}
              alt={user.profile.givenName}
            />
          )}

          {user ? (
            <Button
              color='inherit'
              component={Link}
              to={'/auth'}
              onClick={handleClickLogout}
            >
              Logout
            </Button>
          ) : (
            <Button color='inherit' component={Link} to={'/auth'}>
              Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
