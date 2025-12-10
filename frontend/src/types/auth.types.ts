export interface User {
    id: number;
    email: string;
    firstname?: string;
    lastname?: string;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
}
