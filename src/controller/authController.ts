import { NextFunction, Request, Response } from "express";
import { BadRequestError, InvalidPasswordError, NotFoundError } from "../error/ApiErrors";
import { User } from "../model/User";
import { UserResponseType } from "../types/UserResponseType";
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

    const userResponse: UserResponseType = {
        name,
        email
    }

    return res.status(201).json(userResponse);

}

export const Login = async (req: Request, res: Response, next: NextFunction) => {
    
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user) {
        throw new NotFoundError("Invalid credentials");
    }

    const verify: boolean = await bcrypt.compare(password, user.password);

    if(!verify) {
        throw new InvalidPasswordError("Passwords do not match!");
    }

    const token = jwt.sign(
        { id: user._id}, 
        process.env.PRIVATE_KEY ?? '', 
        {expiresIn: '1w'}
    );

    // return res.status(200).json({message: `key: ${process.env.PRIVATE_KEY}`});
    return res.status(200).json({token: token});
}