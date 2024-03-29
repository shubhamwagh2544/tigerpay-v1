import { Request, Response } from 'express';
import Account from '../models/account';
import createAccountNumber from '../utility/createAccountNumber';

async function createAccount(req: Request, res: Response) {
    const { name, accountType, currency } = req.body;
    const userId = req.userId

    // create an account
    const account = new Account({
        userId,
        accountName: name,
        accountNumber: createAccountNumber(),
        type: accountType,
        currency,
        status: 'active'
    })

    try {
        const newAccount = await account.save();
        return res.status(201).json({
            account: newAccount
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Failed to create account'
        });
    }
}

export {
    createAccount
}