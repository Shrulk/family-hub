import dotenv from 'dotenv';
import type { StringValue } from 'ms';

dotenv.config();

// app config
export const PORT = Number(process.env.APP_PORT) ?? 4000;
export const JWT_ACCESS_SECRET: string = process.env.JWT_ACCESS_SECRET ?? 'access_secret';
export const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET ?? 'refresh_secret';
export const ACCESS_TOKEN_EXPIRES_IN: StringValue = process.env.ACCESS_TOKEN_EXPIRES_IN as StringValue ?? '15m';
export const REFRESH_TOKEN_EXPIRES_IN: StringValue = process.env.REFRESH_TOKEN_EXPIRES_IN as StringValue ?? '7d';
export const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);

// db config
export const DB_HOST = process.env.DB_HOST
export const DB_PORT = Number(process.env.DB_PORT)
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_NAME: string = process.env.DB_NAME ?? 'db_name'
export const DB_URL: string = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`