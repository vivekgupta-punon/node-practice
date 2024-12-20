import exp from 'constants';
import { Router, Request, Response } from 'express';

import { getUsers, getUserById, createUser } from '../controllers/UserController';

const userRouter = Router();

userRouter.post('/create', createUser);
userRouter.get('/:id', getUserById);
userRouter.get('/', getUsers);


export default userRouter;