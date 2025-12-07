import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: { id: number; email: string };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ error: 'Missing authorization header' });

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer')
        return res.status(401).json({ error: 'Invalid authorization header' });

    const token = parts[1];
    if (!token)
        return res.status(401).json({ error: 'Missing token' });

    try {
        const payload: any = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
        req.user = { id: payload.sub, email: payload.email };
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
