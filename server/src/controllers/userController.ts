import { Request, Response } from 'express';
import User from '../models/user';

async function signUp(req: Request, res: Response) {
    const { firstname, lastname, email, password } = req.body
    const existingUser = await User.findOne({
        email
    })
    if (existingUser) {
        return res.status(409).json({
            message: 'User already exists'
        })
    }

    const newUser = new User({
        firstname,
        lastname,
        email,
        password
    })
    await newUser.save()

    return res.status(201).json({
        user: newUser
    })
}

export {
    signUp
}