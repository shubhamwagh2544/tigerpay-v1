import { Request, Response } from 'express';
import Account from '../models/account';
import User from '../models/user';
import createAccountNumber from '../utility/createAccountNumber';

async function createAccount(req: Request, res: Response) {
    try {
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
        const newAccount = await account.save();

        // update user with new account
        user.accounts.push(newAccount._id)
        await user.save()

        return res.status(201).json({
            account: newAccount
        });
    }
    catch (error) {
        console.log(error)
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
    try {
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
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Failed to fetch account'
        })
    }
}


async function updateAccount(req: Request, res: Response) {
    try {
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
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Failed to update account'
        })
    }
}

async function deleteAccount(req: Request, res: Response) {
    try {
        const userId = req.userId
        const accountId = req.params.accountId

        const account = await Account.findOneAndDelete({
            _id: accountId,
            userId
        })

        if (!account) {
            return res.status(404).json({
                message: 'Account not found'
            })
        }

        return res.status(200).json({
            message: 'Account deleted'
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Failed to delete account'
        })
    }
}

export {
    createAccount, deleteAccount,
    //getUserAccounts,
    getUserAccount,
    updateAccount
};
