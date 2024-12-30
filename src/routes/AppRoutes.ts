import { Router, Request, Response } from 'express';
import { AuthUser } from '../middlewares/AuthMiddleware';
import {
    getStatics
} from '../controllers/AppController';

const appRouter = Router();


appRouter.get('/get-statics', getStatics);



export default appRouter;