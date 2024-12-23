import exp from 'constants';
import { Router, Request, Response } from 'express';

import { getUsers, getUserById, createUser, getUsersEnums, loginUser } from '../controllers/UserController';
import cookieJwtAuth from '../middlewares/AuthMiddleware';

const userRouter = Router();

userRouter.post('/login', loginUser);
userRouter.get('/get-user-enums', getUsersEnums);
userRouter.post('/create', cookieJwtAuth, createUser);
userRouter.get('/:id', cookieJwtAuth, getUserById);
userRouter.get('/', cookieJwtAuth, getUsers);


export default userRouter;