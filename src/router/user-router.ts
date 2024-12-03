import express, { NextFunction, Request, Response } from 'express';
import { LoadUserInfo } from '../controller/userController';
import { AuthMiddleware } from '../middleware/AuthMiddleware';

export const userRouter = express.Router();

//todas as rotas abaixo necessitam de autenticação
userRouter.use(AuthMiddleware);

userRouter.get('/', LoadUserInfo);