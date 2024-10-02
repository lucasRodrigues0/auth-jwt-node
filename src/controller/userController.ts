import { Request, Response, NextFunction } from "express"
import { UserResponseType } from "../types/UserResponseType";

export const LoadUserInfo = async (req: Request, res: Response, next: NextFunction) => {

    const user: UserResponseType = req.user;

    res.status(200).json(user);
}