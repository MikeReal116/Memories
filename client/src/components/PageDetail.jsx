import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

import { getMemory } from '../redux/action/index';
import { getMemoriesBySearch } from '../redux/action/index';

const useStyles = makeStyles((theme) => ({
  otherPlaces: {
    marginTop: theme.spacing(4)
  },
  otherImages: {
    width: '100%'
  },
  otherPaper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    transition: '.2 ease-out',
    '&:hover': {
      opacity: 0.8
    }
  }
}));

const PageDetail = () => {
  const { memory, loading, memories } = useSelector((state) => state.memories);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getMemory(id));
  }, [id, dispatch]);

  useEffect(() => {
    memory &&
      dispatch(
        getMemoriesBySearch({
          searchQuery: 'none',
          tags: memory.tags.join(',')
        })
      );
  }, [memory, dispatch]);

  if (!memory) return null;

  if (loading)
    return (
      <Container maxWidth='xs'>
        <CircularProgress />
      </Container>
    );

  const recommendedMemories = memories?.filter(
    (item) => item._id !== memory._id
  );

  const handleClickRemommended = (id) => {
    history.push(`/memories/${id}`);
  };
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant='h6' paragraph>
            {memory.title}
          </Typography>
          <Typography variant='subtitle1' paragraph>
            Created By: {memory.creator}
          </Typography>
          <Typography variant='subtitle1' paragraph>
            {moment(memory.createdAt).fromNow()}
          </Typography>
          <Typography variant='body1' paragraph color='textSecondary'>
            {memory.description}
          </Typography>
          <Typography variant='body2' paragraph color='textSecondary'>
            {memory.tags.length && memory.tags.map((tag) => ` #${tag}`)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <img
            src={
              memory.image ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={memory.title}
          />
        </Grid>
      </Grid>
      <Divider />
      <Typography variant='subtitle1' paragraph className={classes.otherPlaces}>
        Other places you may like
      </Typography>
      <Grid container justify='space-between' spacing={3}>
        {recommendedMemories.length &&
          recommendedMemories.map((memory) => {
            return (
              <Grid item xs={12} md={3} key={memory._id}>
                <Paper
                  elevation={2}
                  className={classes.otherPaper}
                  onClick={() => handleClickRemommended(memory._id)}
                >
                  <Typography variant='subtitle1' paragraph>
                    {memory.title}
                  </Typography>
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className={classes.otherImages}
                  />
                </Paper>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default PageDetail;
