import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import {
    addMoneyToAccount,
    createAccount,
    deleteAccount,
    getUserAccount,
    updateAccount,
    verifyPayment,
} from '../controllers/accountController';

const accountRouter = express.Router();

accountRouter.post('/', authMiddleware, createAccount);

//accountRouter.get('/:userId', authMiddleware, getUserAccounts)

accountRouter.get('/:accountId', authMiddleware, getUserAccount);

accountRouter.put('/:accountId', authMiddleware, updateAccount);

accountRouter.delete('/:accountId', authMiddleware, deleteAccount);

accountRouter.post('/add-money', authMiddleware, addMoneyToAccount);

accountRouter.post('/verify-payment', authMiddleware, verifyPayment);

export default accountRouter;
