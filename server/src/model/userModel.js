import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value))
        throw new Error('pleas enter a valid email');
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7
  }
});

const User = mongoose.model('User', userSchema);
export default User;
