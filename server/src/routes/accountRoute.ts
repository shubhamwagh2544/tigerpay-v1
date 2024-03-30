import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { createAccount, deleteAccount, getUserAccount, updateAccount } from '../controllers/accountController';
const accountRouter = express.Router();

accountRouter.post('/', authMiddleware, createAccount)

//accountRouter.get('/:userId', authMiddleware, getUserAccounts)

accountRouter.get('/:accountId', authMiddleware, getUserAccount)

accountRouter.put('/:accountId', authMiddleware, updateAccount)

accountRouter.delete('/:accountId', authMiddleware, deleteAccount)

export default accountRouter;