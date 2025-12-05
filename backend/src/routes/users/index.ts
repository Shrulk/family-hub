import { Router, type Request, type Response } from "express";

import { UsersController } from "../../controllers/users/index.ts";
import { UserService } from "./../../services/users/index.ts";
import type { User, UserRegisterData } from "../../entities/user.ts";

const router = Router();
const users = new UserService()
// TODO: implement controller
// const usersController = new UsersController()

router.get('/', async function (req: Request, res: Response, next) {
    const usersList = await users.getAllUsers()
    res.status(200).send(usersList)
})

router.put('/', async function (req: Request, res: Response, next) {
    const password_hash = await UserService.hashPassword(req.body.password)
    const userRegisterData: UserRegisterData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password_hash: password_hash,
    }
    const newUserId = await users.createUser(userRegisterData);
    res.status(200).send(newUserId)
})

router.get('/:id', async function (req: Request, res: Response, next) {
    const userId = parseInt(req.params.id ?? "");
    const usersList = await users.getProfile(userId);
    res.status(200).send(usersList)
})

router.post('/:id', async function (req: Request, res: Response, next) {
    const userId = parseInt(req.params.id ?? "");
    const usersList = await users.getProfile(userId);
    res.status(200).send(usersList)
})

export { router };