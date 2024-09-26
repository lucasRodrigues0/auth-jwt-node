import { Request, Response, NextFunction } from "express"

export const LoadUserInfo = async (req: Request, res: Response, next: NextFunction) => {

    res.status(200).json(req.user);
}

//implementar o auth middleware