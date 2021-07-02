import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({
  half,
  name,
  label,
  type,
  handleClickShowPassword,
  onChange,
  value
}) => {
  return (
    <Grid item xm={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        variant='outlined'
        required
        fullWidth
        value={value}
        onChange={onChange}
        label={label}
        type={type}
        InputProps={
          name === 'password'
            ? {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleClickShowPassword}>
                      {type === 'password' ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
