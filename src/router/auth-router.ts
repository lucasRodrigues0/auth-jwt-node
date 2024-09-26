import express, { NextFunction, Request, Response } from 'express';
import { Login, Register } from '../controller/authController';

export const authRouter = express.Router();

authRouter.post('/register', Register);
authRouter.post('/login', Login);