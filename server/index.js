import express from 'express';

import db from './src/db/mongoose.js';
import router from './src/route/memoriesRoute.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/memories', router);

app.listen(PORT, () => {
  console.log('Server started on port 3001');
});
