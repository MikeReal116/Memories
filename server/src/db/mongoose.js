import mongoose from 'mongoose';
import dotevn from 'dotenv';

dotevn.config();

export default mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('db connected'))
  .catch((error) => console.log(error));
