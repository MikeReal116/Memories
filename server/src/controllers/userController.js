import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../model/userModel.js';

export const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json('Unable to login');
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).send('Unable to login');

    const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE, {
      expiresIn: '1h'
    });

    res.send({
      profile: {
        givenName: user.firstName,
        name: `${user.firstName} ${user.lastName}`,
        id: user._id
      },
      token
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const signup = async (req, res) => {
  const { email, firstName, lastName, password, repeatPassword } = req.body;
  if (password !== repeatPassword)
    return res.status(400).send('passwords do not match');

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('User already exist');
    const harshPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: harshPassword
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE, {
      expiresIn: '1h'
    });

    res.status(201).send({
      profile: {
        givenName: user.firstName,
        name: `${user.firstName} ${user.lastName}`,
        id: user._id
      },
      token
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
