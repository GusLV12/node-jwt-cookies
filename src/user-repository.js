import DBLocal from 'db-local';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { SALT_ROUND } from './config.js';
import { Validation } from './validation/validation.auth.js';

const { Schema } = new DBLocal({ path: './db' });

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
});

export class UserRepository {
  static async create ({ username, password }) {
    Validation.username(username);
    Validation.password(password);
    const user = User.findOne({ username });
    if (user) throw new Error('El usuario ya existe');

    const id = crypto.randomUUID();
    const hasshedPassword = await bcrypt.hash(password, SALT_ROUND);

    User.create({
      _id: id,
      username,
      password: hasshedPassword
    }).save();

    return id;
  }

  static async login ({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    const user = User.findOne({ username });
    if (!user) throw new Error('Usuario no existe');

    const isValid = bcrypt.compare(password, user.password);

    if (!isValid) throw new Error('Usuario invalido');

    const { password: _, ...publicUser } = user;
    return publicUser;
  }
}
