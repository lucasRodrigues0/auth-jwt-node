require('dotenv').config();
import "express-async-errors"; //deve estar antes de todos os outros imports
import express from 'express';
import { authRouter } from './router/auth-router';
import { main } from './db';
import { ErrorHandler } from './middleware/ErrorMiddleware';
import { userRouter } from "./router/user-router";
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

//conexão com o banco de dados
main();
app.use(cookieParser());
const port = process.env.PORT || 3000;
//define o tipo de dado que será recebido (json)
app.use(express.json());
//cors
app.use(cors({
    origin: [`${process.env.BASE_URL}`],
    credentials: true
}));
//configuração do(s) router(s)
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
//middleware para tratamento de erros
app.use(ErrorHandler);

app.listen(port, () => {
    console.log(`Servidor iniciado na porta: ${port}`);
});