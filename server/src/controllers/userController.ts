import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Account from '../models/account';

async function signUp(req: Request, res: Response) {
    try {
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
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Failed to sign up'
        })
    }
}

async function signIn(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        const user = await User.findOne({
            email
        })
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        // check password
        const userPassword = user.password
        if (userPassword !== password) {
            return res.status(401).json({
                message: 'Invalid credentials'
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
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Failed to sign in'
        })
    }
    
}

async function getUser(req: Request, res: Response) {
    try {
        const user = await User.findById(req.userId).populate('accounts')
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        return res.status(200).json({
            user: user.toObject()
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Failed to fetch user'
        })
    }
}

async function updateUser(req: Request, res: Response) {
    try {
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
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Failed to update user'
        })
    }
}

async function deleteUser(req: Request, res: Response) {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        // delete accounts
        await Account.deleteMany({
            userId: user._id
        })

        // delete user
        await user.deleteOne()

        return res.status(200).json({
            message: 'User deleted'
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Failed to delete user'
        })
    }
}

export {
    signUp,
    signIn,
    getUser,
    updateUser,
    deleteUser
}