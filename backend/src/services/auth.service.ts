import { db } from '../app/db.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN, BCRYPT_SALT_ROUNDS } from '../config/index.ts';

export const createUser = async (email: string, password: string, firstname?: string, lastname?: string) => {
    const password_hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    const res = await db.query(
        'INSERT INTO users (email, password_hash, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING id, email',
        [email, password_hash, firstname, lastname]
    );
    return res.rows[0];
};

export const findUserByEmail = async (email: string) => {
    const res = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0] ?? null;
};

export const verifyPassword = async (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
};

const signAccessToken = (payload: object) => {
    return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
};

const signRefreshToken = (payload: object) => {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
};

export const generateTokens = async (user: { id: number; email: string }) => {
    const accessToken = signAccessToken({ sub: user.id, email: user.email });
    const refreshToken = signRefreshToken({ sub: user.id });

    // calculate expiry timestamp for storage
    const expiresAt = new Date(Date.now() + msFromJwtExpiry(REFRESH_TOKEN_EXPIRES_IN));

    await db.query(
        'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
        [user.id, refreshToken, expiresAt]
    );

    return { accessToken, refreshToken, expiresAt };
};

// Примечание: функция msFromJwtExpiry простая helper-реализация. 
// Для продакшена можно парсить с помощью пакета или хранить expires_at из payload.
function msFromJwtExpiry(exp: string) {
    // simple parsing: supports '7d', '15m', '3600s'
    const last = exp.slice(-1);
    const num = Number(exp.slice(0, -1));
    if (last === 'd') return num * 24 * 60 * 60 * 1000;
    if (last === 'h') return num * 60 * 60 * 1000;
    if (last === 'm') return num * 60 * 1000;
    if (last === 's') return num * 1000;
    // fallback ms number
    return Number(exp) || 0;
}

export const revokeRefreshToken = async (token: string) => {
    await db.query('DELETE FROM refresh_tokens WHERE token = $1', [token]);
};

export const findRefreshToken = async (token: string) => {
    const res = await db.query('SELECT * FROM refresh_tokens WHERE token = $1', [token]);
    return res.rows[0] ?? null;
};
