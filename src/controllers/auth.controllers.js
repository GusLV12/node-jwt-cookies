import { SECRET_KEY } from '../config.js';
import { UserRepository } from '../user-repository.js';
import jwt from 'jsonwebtoken';

export const home = (req, res) => {
  const { user } = req.session;
  res.render('index', user);
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserRepository.login({ username, password });
    const token = jwt.sign({ id: user._id, username: user.username, password: user.password }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('access_token', token, { httpOnly: true, sameSite: 'strict' }).send({ user, token });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const id = await UserRepository.create({ username, password });
    res.send({ id });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const logout = (req, res) => {
  res.clearCookie('access_token')
    .json({ message: 'Logout Succesful' });
};

export const protectedPage = (req, res) => {
  const { user } = req.session;
  if (!user) return res.status(401).send('Not authenticated');
  res.render('protected', user);
};
