import { Router } from 'express';

import {
    getTaskEnums, createTask, getTasks
} from '../controllers/TaskController';

import { AuthUser } from '../middlewares/AuthMiddleware';


const taskRouter = Router();


taskRouter.get('/get-task-enums', getTaskEnums);
taskRouter.post('/create', AuthUser, createTask);
taskRouter.get('/get-all', AuthUser, getTasks);



export default taskRouter;