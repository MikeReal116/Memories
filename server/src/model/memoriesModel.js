import mongoose from 'mongoose';

const memorySchema = new mongoose.Schema(
  {
    creator: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    tags: [String],
    likes: [String]
  },
  {
    timestamps: true
  }
);

const Memory = mongoose.model('Memory', memorySchema);

export default Memory;
