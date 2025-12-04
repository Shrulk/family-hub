export type UserRegisterData = {
    firstname: string;
    lastname: string;
    email: string;
}

export type User = UserRegisterData & { id: number; }