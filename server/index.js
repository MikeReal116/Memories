import express from 'express';
import cors from 'cors';

import db from './src/db/mongoose.js';
import router from './src/route/memoriesRoute.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use('/memories', router);

app.listen(PORT, () => {
  console.log('Server started on port 3001');
});
