import { type User } from '../types/auth.types';

const USER_KEY = 'auth_user';
const TOKEN_KEY = 'auth_token';

export const authStore = {
    setAuth(user: User, token: string) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        localStorage.setItem(TOKEN_KEY, token);
    },

    clear() {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
    },

    getUser(): User | null {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    },

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    },
};
