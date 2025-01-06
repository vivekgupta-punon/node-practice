import { Router } from 'express';
import { AuthUser } from '../middlewares/AuthMiddleware';
import {
    getDailyUpdates, addCommitment, addUpdate, updateCommitment,
    updateUpdate, checkUpdate
} from '../controllers/UpdateController';


const dailyUpdateRouter = Router();

dailyUpdateRouter.get('/', AuthUser, getDailyUpdates);
dailyUpdateRouter.post('/add-commitment', AuthUser, addCommitment);
dailyUpdateRouter.post('/add-update', AuthUser, addUpdate);
dailyUpdateRouter.post('/update-commitment', AuthUser, updateCommitment);
dailyUpdateRouter.post('/update-update', AuthUser, updateUpdate);
dailyUpdateRouter.post('/check-update', AuthUser, checkUpdate);

export default dailyUpdateRouter;