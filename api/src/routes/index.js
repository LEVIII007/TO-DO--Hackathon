import { Router } from 'express';
import userRoutes from './user-routes.js';
import taskRoutes from './task-routes.js';

const appRouter = Router();

appRouter.use("/user", userRoutes);   //domain/api/user

appRouter.use("/task", taskRoutes);   //domain/api/chat

export default appRouter;
