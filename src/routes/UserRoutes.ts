import exp from 'constants';
import { Router, Request, Response } from 'express';

import { getUsers, getUserById, createUser, getUsersEnums, loginUser } from '../controllers/UserController';
import cookieJwtAuth from '../middlewares/AuthMiddleware';
import AuthUser from '../middlewares/AuthMiddleware';


const userRouter = Router();

userRouter.post('/login', loginUser);
userRouter.get('/get-user-enums', getUsersEnums);
userRouter.post('/register', createUser);
userRouter.get('/:id', getUserById);
userRouter.get('/', AuthUser, getUsers);


export default userRouter;