import bcrypt from 'bcrypt';
import { type User, type UserRegisterData } from "../entities/user.ts";
import { db } from "../app/db.ts";
import { BCRYPT_SALT_ROUNDS } from "../config/index.ts";

export class UserService {
    static verifyId = (id: number) => !Number.isNaN(id)
    static verifyPassword = async (password: string, passwordHash: string): Promise<boolean> => {
        return bcrypt.compare(password, passwordHash);
    }
    static hashPassword = async (password: string): Promise<string> => {
        return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    }

    async getAllUsers(): Promise<User[]> {
        const res = await db.query(`SELECT firstname, lastname FROM users`)
        return res.rows
    }

    async getUser(userId: number): Promise<User> {
        if (!UserService.verifyId(userId))
            throw new Error('Invalid user ID')
        const res = await db.query(`SELECT firstname, lastname, email FROM users WHERE id = ${userId}`)
        return res.rows[0]
    }

    async getProfile(userId: number): Promise<User> {
        if (!UserService.verifyId(userId))
            throw new Error('Invalid user ID')
        const res = await db.query(`SELECT firstname, lastname, email FROM users WHERE id = ${userId}`)
        return res.rows[0];
    }

    async createUser(userRegisterData: UserRegisterData): Promise<number> {
        const query: string =
            `INSERT INTO users (firstname, lastname, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id;`
        const res = await db.query(query,
            [userRegisterData.firstname, userRegisterData.lastname, userRegisterData.email, userRegisterData.password_hash]);

        return res.rows[0].id;
    }
}
