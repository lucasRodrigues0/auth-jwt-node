import { NextFunction, Request, Response } from "express";
import { BadRequestError, InvalidPasswordError, NotFoundError } from "../error/ApiErrors";
import { User } from "../model/User";
import { UserType } from "../types/UserType";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Register = async (req: Request, res: Response, next: NextFunction) => {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError("User already exists");
    }

    const user: UserType = {
        name,
        email,
        password: await bcrypt.hash(password, 10)
    }

    await User.create(user);

    return res.status(201).json({ message: "created" });

}

export const Login = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new NotFoundError("User not found");
    }

    const verify: boolean = await bcrypt.compare(password, user.password);

    if (!verify) {
        throw new InvalidPasswordError("Invalid credentials");
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.PRIVATE_KEY ?? '',
        { expiresIn: '1w' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 4 * 60 * 60 * 1000, //1 semana
        sameSite: 'strict'
    });

    return res.status(200).json({ message: "login successfull!" });
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    // If middleware passes, user is authenticated
    res.status(200).json({ isAuthenticated: true });
}

export const Logout = (req: Request, res: Response, next: NextFunction) => {

    res.cookie('token', '', {
        httpOnly: true,
        secure: false,
        maxAge: 0,
        sameSite: 'strict'
    });

    return res.status(200).json({ message: "logout success!" });
}