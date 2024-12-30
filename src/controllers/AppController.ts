import { Request, Response, NextFunction } from 'express';
import Task, { TaskEnum } from '../models/TaskModel';

export async function getStatics(req:Request, res:Response, next:NextFunction)
{  
    try
    {
        const tasks = await Task.findAll() as any[];
        let statics = {
            "pending"       : tasks.filter((task) => task.status == TaskEnum.STATUS_PENDING).length,
            "in_progress"   : tasks.filter((task) => task.status == TaskEnum.STATUS_IN_PROGRESS).length,
            "completed"     : tasks.filter((task) => task.status == TaskEnum.STATUS_COMPLETED).length,
            "tested"        : tasks.filter((task) => task.status == TaskEnum.STATUS_TESTED).length,
            "cancelled"     : tasks.filter((task) => task.status == TaskEnum.STATUS_CANCELLED).length,
            "expired"       : tasks.filter((task) => task.status == TaskEnum.STATUS_EXPIRED).length
        };

        res.status(200)
           .send(statics);
    }
    catch(error)
    {
        res.status(500)
           .send(error);    
    }
}