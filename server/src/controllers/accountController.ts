import { Request, Response } from 'express';
import Account from '../models/account';
import createAccountNumber from '../utility/createAccountNumber';
import User from '../models/user';
import mongoose from 'mongoose';

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

    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    try {
        const newAccount = await account.save();

        // update user with new account
        user.accounts.push(newAccount._id)
        await user.save()

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

// async function getUserAccounts(req: Request, res: Response) {
//     const userId = req.userId
//     const accounts = await Account.find({ userId })

//     return res.status(200).json({
//         accounts
//     })
// }

async function getUserAccount(req: Request, res: Response) {
    const userId = req.userId
    const accountId = req.params.accountId

    const account = await Account.findOne({
        _id: accountId,
        userId
    })

    if (!account) {
        return res.status(404).json({
            message: 'Account not found'
        })
    }

    return res.status(200).json({
        account
    })
}


async function updateAccount(req: Request, res: Response) {
    const userId = req.userId
    const accountId = req.params.accountId

    const account = await Account.findOneAndUpdate({
        _id: accountId,
        userId
    }, req.body, { new: true }) 

    if (!account) {
        return res.status(404).json({
            message: 'Account not found'
        })
    }

    return res.status(200).json({
        account
    })
}

async function deleteAccount(req: Request, res: Response) {
    const userId = req.userId
    const accountId = req.params.accountId
}

export {
    createAccount,
    //getUserAccounts,
    getUserAccount,
    updateAccount,
    deleteAccount
}