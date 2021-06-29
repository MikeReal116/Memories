import React from 'react';
import { Container, Grid } from '@material-ui/core';

import Form from './Form';

const Home = () => {
  return (
    <Container>
      <Container>
        <Grid container justify='space-between' spacing={3}>
          <Grid item xs={12} sm={7}>
            <div></div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Home;
