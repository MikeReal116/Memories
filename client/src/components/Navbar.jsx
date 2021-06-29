import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MemoryIcon from '@material-ui/icons/Memory';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(2)
  }
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar>
        <MemoryIcon />
        <Typography variant='h6'>Memories</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
