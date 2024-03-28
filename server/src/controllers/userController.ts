import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
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

    // generate token
    const token = jwt.sign({
        id: newUser._id,
        email: newUser.email
    }, process.env.JWT_SECRET as string)

    return res.status(201).json({
        user: newUser,
        token
    })
}

async function signIn(req: Request, res: Response) {
    const { email, password } = req.body
    const user = await User.findOne({
        email
    })
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }

    // generate token
    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET as string)

    return res.status(200).json({
        user,
        token
    })
}

async function getUser(req: Request, res: Response) {
    const user = await User.findById(req.userId)
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }
    return res.status(200).json({
        user: user.toObject()
    })
}

async function updateUser(req: Request, res: Response) {
    const { firstname, lastname, password } = req.body
    const user = await User.findById(req.userId)
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }

    // update user
    user.firstname = firstname
    user.lastname = lastname
    user.password = password
    await user.save()

    return res.status(200).json({
        user
    })
}

export {
    signUp,
    signIn,
    getUser,
    updateUser
}