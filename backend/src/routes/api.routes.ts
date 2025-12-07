import authRoutes from './auth.routes.ts';
import { router as usersApiRouter } from './users.routes.ts';
import { Router } from 'express';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', usersApiRouter)

export { apiRouter };