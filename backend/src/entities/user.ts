export type UserRegisterData = {
    firstname: string;
    lastname: string;
    email: string;
    password_hash: string;
}

export type User = UserRegisterData & { id: number; }