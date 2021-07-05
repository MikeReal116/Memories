import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

import { deleteMemory, likeMemory } from '../../redux/action';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
    cursor: 'pointer'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    height: '100%',
    transition: '.2s ease-out',
    '&:hover': {
      zIndex: 1,
      opacity: 0.8
    }
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
  },
  cardIcons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  likeText: {
    color: '#3f51b5',
    fontSize: 12
  },
  like: {
    display: 'flex',
    alignItems: 'center'
  },
  tags: {
    marginBottom: 0,
    fontSize: '12px',
    color: '#989898'
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
  setMemoryId,
  creatorId,
  likes
}) => {
  const user = useSelector((state) => state.auth.user?.profile);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleEditCard = (memoryId) => {
    setMemoryId(memoryId);
  };

  const handleDelete = (id) => {
    dispatch(deleteMemory(id));
  };

  const handleClickLike = (id) => {
    dispatch(likeMemory(id));
  };

  const handleClickPageDetail = (id) => {
    history.push(`/memories/${id}`);
  };

  const showLikeDetail = () => {
    if (!likes.length) return;
    if (likes.includes(user.id || user.googleId) && likes.length === 1) {
      return user.givenName;
    }
    if (likes.includes(user.id || user.googleId) && likes.length > 1) {
      return `You and ${
        likes.length === 2 ? ` one other` : likes.length - 1` others`
      }`;
    }
    if (!likes.includes(user.id || user.googleId) && likes.length) {
      return `${likes.length === 1 ? `1 like` : likes.length`likes`}`;
    }
  };

  return (
    <Card className={classes.card} elevation={6}>
      <CardMedia
        className={classes.media}
        image={
          image ||
          'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
        }
        title={title}
        onClick={() => handleClickPageDetail(id)}
      />
      <div className={classes.imageoverlay1}>
        <Typography>{creator}</Typography>
        <Typography>{moment(createdAt).fromNow()}</Typography>
      </div>
      {user && creatorId === (user.id || user.googleId) && (
        <IconButton
          className={classes.imageoverlay2}
          onClick={() => handleEditCard(id)}
        >
          <MoreVertIcon />
        </IconButton>
      )}
      <CardContent>
        <Typography variant='h6' color='textSecondary' paragraph>
          {title}
        </Typography>
        <Typography
          paragraph
          variant='body2'
          color='textSecondary'
          component='p'
        >
          {description}
        </Typography>
        <Typography className={classes.tags}>
          {tags.length &&
            tags.map((tag) => tag.split(',').map((item) => ` #${item}`))}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardIcons}>
        {user && (
          <div className={classes.like}>
            <IconButton onClick={() => handleClickLike(id)}>
              {likes.includes(user.id || user.googleId) ? (
                <ThumbUpIcon color='primary' />
              ) : (
                <ThumbUpOutlinedIcon />
              )}
            </IconButton>
            <span className={classes.likeText}>{showLikeDetail()}</span>
          </div>
        )}
        {user && creatorId === (user.id || user.googleId) && (
          <IconButton onClick={() => handleDelete(id)}>
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default MemoryCard;
