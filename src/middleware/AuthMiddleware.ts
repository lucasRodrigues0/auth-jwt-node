import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError, NotFoundError } from "../error/ApiErrors";
import { User } from "../model/User";
import { UserResponseType } from "../types/UserResponseType";
import { UserType } from "../types/UserType";
import jwt from 'jsonwebtoken';

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers;

    if(!authorization) {
        throw new UnauthorizedError("Unauthorized");
    }

    const token = authorization.split(' ')[1];

    const { id } = jwt.verify(token, process.env.PRIVATE_KEY ?? '') as JwtPayload;

    const user: UserType | null = await User.findById(id);

    if(!user) {
        throw new NotFoundError("User not found");
    }

    const userResponse: UserResponseType = {
        name: user.name,
        email: user.email
    }

    req.user = userResponse;

    next();

}