import express from 'express';
import { checkAuth, Login, Logout, Register } from '../controller/authController';
import { AuthMiddleware } from '../middleware/AuthMiddleware';

export const authRouter = express.Router();

authRouter.post('/register', Register);
authRouter.post('/login', Login);
authRouter.get('/check-auth', AuthMiddleware, checkAuth);
authRouter.post('/logout', Logout);