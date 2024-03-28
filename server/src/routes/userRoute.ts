import express from 'express';
import { deleteUser, getUser, signIn, signUp, updateUser } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';
const userRouter = express.Router()

userRouter.post('/signup', signUp)

userRouter.post('/signin', signIn)

userRouter.get('/profile', authMiddleware, getUser)

userRouter.put('/profile', authMiddleware, updateUser)

userRouter.delete('/profile', authMiddleware, deleteUser)

export default userRouter;