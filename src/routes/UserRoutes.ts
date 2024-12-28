import { Router, Request, Response } from 'express';
import { AuthUser } from '../middlewares/AuthMiddleware';
import {
    createUser, deleteUser, getUsersEnums, loginUser,
    getUserById, logoutUser, getUsers, updateUser
} from '../controllers/UserController';

// import { AuthUser } from '../middlewares/AuthMiddleware';


const userRouter = Router();

userRouter.post('/register', createUser);
userRouter.post('/delete', AuthUser, deleteUser);
userRouter.post('/update', AuthUser, updateUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', AuthUser, logoutUser);

userRouter.get('/get-user-enums', getUsersEnums);
userRouter.get('/:id', AuthUser, getUserById);
userRouter.get('/', AuthUser, getUsers);


export default userRouter;