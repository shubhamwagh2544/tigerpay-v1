import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { createAccount, getUserAccounts } from '../controllers/accountController';
const accountRouter = express.Router();

accountRouter.post('/', authMiddleware, createAccount)

accountRouter.get('/:userId', authMiddleware, getUserAccounts)

export default accountRouter;