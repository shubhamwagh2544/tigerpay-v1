import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { createAccount } from '../controllers/accountController';
const accountRouter = express.Router();

accountRouter.post('/', authMiddleware, createAccount)

export default accountRouter;