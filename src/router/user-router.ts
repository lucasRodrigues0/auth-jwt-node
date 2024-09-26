import express, { NextFunction, Request, Response } from 'express';
import { LoadUserInfo } from '../controller/userController';
import { AuthMiddleware } from '../middleware/AuthMiddleware';

export const userRouter = express.Router();

userRouter.get("/public", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({msg: "Hello World!"});
})

//todas as rotas abaixo necessitam de autenticação
userRouter.use(AuthMiddleware)

userRouter.get('/', LoadUserInfo);