import { UserRepository } from '../user-repository.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserRepository.login({ username, password });
    res.send({ user });
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
  res.send('<h1>logout</h1>');
};
