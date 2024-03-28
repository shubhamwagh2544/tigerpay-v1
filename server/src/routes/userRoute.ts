import express from 'express';
import { getUser, signIn, signUp } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';
const userRouter = express.Router()

userRouter.post('/signup', signUp)

userRouter.post('/signin', signIn)

userRouter.get('/profile', authMiddleware, getUser)

export default userRouter;