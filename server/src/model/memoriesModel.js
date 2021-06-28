import mongoose from 'mongoose';

const memorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  image: String,
  tags: [String]
});

const Memory = mongoose.model('Memory', memorySchema);

export default Memory;
