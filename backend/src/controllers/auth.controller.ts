import { type Request, type Response } from 'express';
import { RegisterSchema, LoginSchema } from '../dto/auth.dto.ts';
import * as authService from './../services/auth.service.ts';
import { db } from '../app/db.ts';
import { JWT_REFRESH_SECRET } from '../config/index.ts';

export const register = async (req: Request, res: Response) => {
    const parse = RegisterSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json({ error: parse.error.issues });

    const { email, password, firstname, lastname } = parse.data;

    const existing = await authService.findUserByEmail(email);
    if (existing) return res.status(409).json({ error: 'User already exists' });

    const user = await authService.createUser(email, password, firstname, lastname);
    res.status(201).json({ user });
};

export const login = async (req: Request, res: Response) => {
    const parse = LoginSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json({ error: parse.error.issues });

    const { email, password } = parse.data;
    const user = await authService.findUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await authService.verifyPassword(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const tokens = await authService.generateTokens({ id: user.id, email: user.email });
    res.json({ user: { id: user.id, email: user.email, name: user.name }, ...tokens });
};

export const refresh = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'refreshToken is required' });

    // verify exists in DB
    const saved = await authService.findRefreshToken(refreshToken);
    if (!saved) return res.status(401).json({ error: 'Invalid refresh token' });

    // verify signature
    try {
        const payload: any = (require('jsonwebtoken') as typeof import('jsonwebtoken')).verify(refreshToken, JWT_REFRESH_SECRET);
        const userId = payload.sub;
        // issue new tokens
        const userRes = await db.query('SELECT id, email, name FROM users WHERE id = $1', [userId]);
        const user = userRes.rows[0];
        if (!user) return res.status(401).json({ error: 'User not found' });

        // revoke old token
        await authService.revokeRefreshToken(refreshToken);

        const tokens = await authService.generateTokens({ id: user.id, email: user.email });
        return res.json(tokens);
    } catch (err) {
        return res.status(401).json({ error: 'Invalid refresh token' });
    }
};

export const logout = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'refreshToken is required' });
    await authService.revokeRefreshToken(refreshToken);
    res.json({ ok: true });
};