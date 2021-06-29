import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import FileBase from 'react-file-base64';

const useStyle = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2)
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  fileInput: {
    width: '90%',
    margin: '15px 0'
  },
  submitBtn: {
    marginBottom: 15
  }
}));

const Form = () => {
  const [formData, setFormData] = useState({
    creator: '',
    title: '',
    description: '',
    tags: '',
    image: ''
  });
  const classes = useStyle();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={classes.form}>
        <Typography variant='h6'> Create some memories</Typography>
        <TextField
          name='creator'
          variant='outlined'
          label='Creator'
          fullWidth
          value={formData.creator}
          onChange={handleChange}
        />
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          name='description'
          variant='outlined'
          label='Description'
          fullWidth
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          value={formData.tags}
          onChange={handleChange}
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={(base64) => setFormData({ ...formData, image: base64 })}
          />
        </div>
        <Button
          variant='contained'
          color='primary'
          size='small'
          fullWidth
          className={classes.submitBtn}
        >
          Submit
        </Button>
        <Button variant='contained' color='secondary' size='small' fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
