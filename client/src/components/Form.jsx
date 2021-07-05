import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { PostMemory, updateMemory } from '../redux/action';

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
  },
  input: {
    marginBottom: 10
  }
}));

const Form = ({ memoryId, setMemoryId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    image: ''
  });

  const currentMemory = useSelector((state) =>
    memoryId
      ? state.memories.memories.find((memory) => memory._id === memoryId)
      : null
  );

  const user = useSelector((state) => state.auth?.user?.profile?.givenName);

  useEffect(() => {
    currentMemory && setFormData(currentMemory);
  }, [currentMemory]);

  const dispatch = useDispatch();
  const classes = useStyle();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentMemory) {
      dispatch(updateMemory(memoryId, formData));
      clear();
      return;
    }
    dispatch(PostMemory({ ...formData, creator: user }));
    clear();
  };

  const clear = () => {
    setFormData({
      title: '',
      description: '',
      tags: '',
      image: ''
    });
    setMemoryId('');
  };
  const disabled =
    formData.creator === '' ||
    formData.title === '' ||
    formData.description === ''
      ? true
      : false;
  return (
    <Paper className={classes.paper}>
      {user ? (
        <form
          autoComplete='off'
          noValidate
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <Typography variant='h6'>
            {currentMemory ? 'Edit memory' : 'Create some memories'}
          </Typography>
          <TextField
            name='title'
            variant='outlined'
            label='Title'
            fullWidth
            required={true}
            value={formData.title}
            onChange={handleChange}
            className={classes.input}
          />
          <TextField
            name='description'
            variant='outlined'
            label='Description'
            required={true}
            fullWidth
            value={formData.description}
            onChange={handleChange}
            className={classes.input}
          />
          <TextField
            name='tags'
            variant='outlined'
            label='Tags'
            fullWidth
            value={formData.tags}
            onChange={handleChange}
            className={classes.input}
          />
          <div className={classes.fileInput}>
            <FileBase
              type='file'
              multiple={false}
              onDone={(base64) =>
                +base64.size.split(' ')[0] > 1000
                  ? alert('Select a file less than 1mb')
                  : setFormData({ ...formData, image: base64.base64 })
              }
            />
          </div>
          <Button
            variant='contained'
            color='primary'
            size='small'
            fullWidth
            className={classes.submitBtn}
            type='submit'
            disabled={disabled}
          >
            Submit
          </Button>
          <Button
            variant='contained'
            color='secondary'
            size='small'
            fullWidth
            disabled={disabled}
            onClick={clear}
          >
            Clear
          </Button>
        </form>
      ) : (
        <Typography variant='h6'> Login to create and like post</Typography>
      )}
    </Paper>
  );
};

export default Form;
