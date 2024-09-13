import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

export const tryToken = (req, res, next) => {
  const token = req.cookies.access_token;
  let data = null;

  req.session = { user: null };

  try {
    data = jwt.verify(token, SECRET_KEY);
    req.session.user = data;
  } catch (error) {
    req.session.user = null;
    res.send('No authenticated');
  }

  next();
};
