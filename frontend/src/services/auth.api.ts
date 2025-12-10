import { type AuthResponse, type LoginDto, type RegisterDto } from '../types/auth.types.ts';

const API_URL = 'http://localhost:4000/api/auth';

export const authApi = {
    async login(dto: LoginDto): Promise<AuthResponse> {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto),
        });

        if (!res.ok) {
            throw new Error('Ошибка при входе в систему');
        }

        return res.json();
    },

    async register(dto: RegisterDto): Promise<{ user: any }> {
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto),
        });

        if (!res.ok) {
            throw new Error('Ошибка при регистрации');
        }

        return res.json();
    },
};
