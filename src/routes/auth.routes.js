import { Router } from 'express';
import { home, login, logout, protectedPage, register } from '../controllers/auth.controllers.js';
import { tryToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', home);

router.post('/login', tryToken, login);

router.post('/register', register);

router.get('/logout', logout);

router.get('/protected', protectedPage);

export default router;
