require('dotenv').config();
import "express-async-errors";
import express from 'express';
import { authRouter } from './router/auth-router';
import { main } from './db';
import { ErrorHandler } from './middleware/ErrorMiddleware';
import { userRouter } from "./router/user-router";

const app = express();

//conexão com o banco de dados
main();

const port = process.env.PORT || 3000;
//define o tipo de dado que será recebido (json)
app.use(express.json());
//configuração do(s) router(s)
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
//middleware para tratamento de erros
app.use(ErrorHandler);

app.listen(port, () => {
    console.log(`Servidor iniciado na porta: ${port}`);
});