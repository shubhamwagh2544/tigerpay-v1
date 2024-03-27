import { Request, Response } from 'express';

async function signin(req: Request, res: Response) {
    return res.status(200).json({ message: 'Signin' });
}

export {
    signin
}