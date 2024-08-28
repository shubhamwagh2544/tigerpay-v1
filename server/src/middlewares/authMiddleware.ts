import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;

        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }

        // verify token
        const bearerToken = token.split(' ')[1];
        jwt.verify(bearerToken, process.env.JWT_SECRET as string, (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    message: 'Unauthorized',
                });
            }

            req.userId = (decoded as jwt.JwtPayload).id as string;
            next();
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
}

export default authMiddleware;
