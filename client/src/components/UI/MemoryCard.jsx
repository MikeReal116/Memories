import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { deleteMemory } from '../../redux/action';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative'
  },
  imageoverlay1: {
    position: 'absolute',
    top: '3%',
    left: '5%',
    color: '#fff'
  },
  imageoverlay2: {
    position: 'absolute',
    top: '3%',
    right: '5%',
    color: '#fff'
  }
}));

const MemoryCard = ({
  image,
  tags,
  title,
  description,
  createdAt,
  creator,
  id,
  setMemoryId
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleEditCard = (memoryId) => {
    setMemoryId(memoryId);
  };

  const handleDelete = (id) => {
    dispatch(deleteMemory(id));
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          image ||
          'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
        }
        title={title}
      />
      <div className={classes.imageoverlay1}>
        <Typography>{creator}</Typography>
        <Typography>{moment(createdAt).fromNow()}</Typography>
      </div>
      <IconButton
        className={classes.imageoverlay2}
        onClick={() => handleEditCard(id)}
      >
        <MoreVertIcon />
      </IconButton>
      <CardContent>
        <Typography variant='h6' color='textSecondary' paragraph>
          {title}
        </Typography>
        <Typography paragraph>{description}</Typography>
        <Typography>
          {tags.length &&
            tags.map((tag) => tag.split(',').map((item) => ` #${item}`))}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => handleDelete(id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MemoryCard;
