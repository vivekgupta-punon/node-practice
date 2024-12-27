import { Request, Response, NextFunction } from 'express';
import Task, { TaskEnum } from '../models/TaskModel';
import User from '../models/UserModel';
import AppDataSource from '../config/Database';
import { format } from 'date-fns';
import { In } from 'typeorm';




export function getTaskEnums(req:Request, res:Response)
{
    res.status(200)
       .send({
           levels   : TaskEnum.levels,
           statuses : TaskEnum.statuses,
       });
}


export async function getTasks(req:Request, res:Response)
{
    const taskRespository   = AppDataSource.getRepository(Task);
    const userRespository   = AppDataSource.getRepository(User);
    let userIdList:number[] = [];
    
    await taskRespository.find().then((tasks) => {

        const all_tasks = tasks.map(task => ({
            id          : task.id,
            title       : task.title,
            content     : task.content,
            level       : TaskEnum.levels[task.level],
            status      : TaskEnum.statuses[task.status],
            deadline    : task.expires_at,
            assigned_to : task.user_id,
            created_by  : task.created_by,
            updated_by  : task.updated_by,
        }));

        const userIdSet = new Set<number>();

        all_tasks.forEach(task => {
            userIdSet.add(task.assigned_to);
            userIdSet.add(task.created_by);
        });

        userIdList = Array.from(userIdSet);
    }).catch((error) => {
        res.status(500)
           .send(error);
    });


    let tempUserList = await userRespository.find({
        where: {
            id: In(userIdList)
        }
    }).then((users) => {

        let tempUserList:any = {};
        for(let i of users)
        {
            tempUserList[i.id] = {
                id          : i.id,
                first_name  : i.first_name,
                last_name   : i.last_name,
                email       : i.email,
                mobile      : i.mobile,
                role        : i.role,
                department  : i.department,
            };
        }
        return tempUserList;
    }).catch((error) => {
        res.status(500)
           .send(error);
    });

    let response:any = {};
    for(let i of all_tasks)
    {

    }



    res.status(200)
        .send(tempUserList);
}


export function createTask(req:Request, res:Response)
{
    const taskRespository = AppDataSource.getRepository(Task);

    try
    {
        let expires_at = format(new Date(req.body.deadline), 'yyyy-MM-dd HH:mm:ss');


        let task = new Task();
        task.title      = req.body.title;
        task.content    = req.body.content;
        task.level      = req.body.level;
        task.status     = req.body.status;
        task.user_id    = req.body.assigned_to;
        task.expires_at = expires_at;
        task.created_by = req.body.user.id;
        task.updated_by = req.body.user.id;
    
        taskRespository.save(task);
    
        res.status(200)
           .send({
               message: 'Task created successfully',
               status : 200,
               success: true
           });
    }
    catch(error)
    {
        res.status(500)
           .send({
               message: 'Something went wrong',
               status : 500,
               success: false
           });
    }
}