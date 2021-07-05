import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import Form from './Form';
import MemoryCard from './UI/MemoryCard';
import Search from './UI/Search';
import { getMemories } from '../redux/action';

const Home = () => {
  const [memoryId, setMemoryId] = useState('');
  const dispatch = useDispatch();
  const { memories, loading } = useSelector((state) => state.memories);

  useEffect(() => {
    dispatch(getMemories());
  }, [dispatch]);
  const handleMemoryId = (id) => {
    setMemoryId(id);
  };

  return (
    <Container maxWidth='xl'>
      <Container maxWidth='xl'>
        {loading && <CircularProgress />}
        <Grid container justify='space-between' spacing={3}>
          <Grid item xs={12} sm={6} md={8}>
            <Grid container spacing={2}>
              {!memories.length ? (
                <Typography></Typography>
              ) : (
                memories.map((memory) => (
                  <Grid item xs={12} sm={12} md={4} key={memory._id}>
                    <MemoryCard
                      image={memory.image}
                      creator={memory.creator}
                      title={memory.title}
                      description={memory.description}
                      tags={memory.tags}
                      createdAt={memory.createdAt}
                      id={memory._id}
                      setMemoryId={handleMemoryId}
                      creatorId={memory.creatorId}
                      likes={memory.likes}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Search />
            <Form memoryId={memoryId} setMemoryId={handleMemoryId} />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Home;
