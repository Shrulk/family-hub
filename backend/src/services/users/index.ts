import { type User, type UserRegisterData } from "../../entities/user.ts";
import { db } from "../../app/db.ts";

export class UserService {
    async getAllUsers() {
        return [] // fakeDB.getUsers();
    }

    getUser(id: number) {
        return id // fakeDB.getUserById(id);
    }

    async getProfile(userId: number): Promise<User> {
        const user: User = {
            id: userId,
            firstname: 'John',
            lastname: 'Smith',
            email: 'john.smith@example.com'
        };
        return user;
    }

    async createUser(userRegisterData: UserRegisterData): Promise<User> {
        const newUser = {
            id: 1, // fakeDB.createUser(userRegisterData);
            firstname: userRegisterData.firstname,
            lastname: userRegisterData.lastname,
            email: userRegisterData.email,
        };
        return newUser;
    }
}
