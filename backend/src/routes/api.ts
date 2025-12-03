import { router as usersApiRouter } from './users/index.ts';
import { Router } from 'express';

const apiRouter = Router();

apiRouter.use('/users', usersApiRouter)

export { apiRouter };