import exp from 'constants';
import { Router, Request, Response } from 'express';

import {
    getUsers, getUserById, createUser,
    getUsersEnums, loginUser, logoutUser
} from '../controllers/UserController';

import { AuthUser } from '../middlewares/AuthMiddleware';


const userRouter = Router();

userRouter.post('/register', createUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', AuthUser, logoutUser);

userRouter.get('/get-user-enums', getUsersEnums);
userRouter.get('/:id', AuthUser, getUserById);
userRouter.get('/', AuthUser, getUsers);


export default userRouter;