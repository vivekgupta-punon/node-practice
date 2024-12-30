import { Router } from 'express';

import {
    getTaskEnums, createTask, getTasks, getTask,
    updateTask
} from '../controllers/TaskController';

import { AuthUser } from '../middlewares/AuthMiddleware';


const taskRouter = Router();


taskRouter.get('/get-task-enums', getTaskEnums);
taskRouter.post('/create', AuthUser, createTask);
taskRouter.get('/get-all', AuthUser, getTasks);
taskRouter.get('/:id', AuthUser, getTask);
// taskRouter.post('/delete', AuthUser, getTask);
taskRouter.post('/update', AuthUser, updateTask);



export default taskRouter;