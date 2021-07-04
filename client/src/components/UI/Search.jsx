import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { getMemoriesBySearch } from '../../redux/action';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5)
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  searchTerm: {
    marginBottom: theme.spacing(2)
  }
}));

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();

  const handleDelete = (deletetag) => {
    setTags(tags.filter((tag) => tag !== deletetag));
  };

  const handleChipKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      setTags([...tags, searchTag]);
      setSearchTag('');
    }
  };

  const handleClickSearch = () => {
    if (searchTerm || tags.length) {
      dispatch(
        getMemoriesBySearch({ searchQuery: searchTerm, tags: tags.join(',') })
      );
      history.push(
        `/memories/search?${searchTerm && `searchQuery=${searchTerm}`}${
          tags.length && `&tags=${tags.join(',')}`
        }`
      );
    }
  };

  return (
    <Paper className={classes.root} elevation={3}>
      <TextField
        label='Search memories'
        variant='outlined'
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={classes.searchTerm}
      />
      <TextField
        label='Search tags'
        variant='outlined'
        fullWidth
        onKeyPress={handleChipKeyPress}
        onChange={(e) => setSearchTag(e.target.value)}
        value={searchTag}
      />
      <ul className={classes.tags}>
        {tags.map((tag) => (
          <li key={tag + Date.now()}>
            <Chip
              label={tag}
              className={classes.chip}
              onDelete={() => handleDelete(tag)}
            />
          </li>
        ))}
      </ul>

      <Button
        variant='contained'
        color='primary'
        fullWidth
        onClick={handleClickSearch}
      >
        Search
      </Button>
    </Paper>
  );
};

export default Search;
