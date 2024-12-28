import { Request, Response, NextFunction } from 'express';
import Task, { TaskEnum } from '../models/TaskModel';
import User from '../models/UserModel';
import { format } from 'date-fns';
// import { In } from 'typeorm';




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
    const tasks = await Task.findAll({
        attributes: {
            exclude: ['created_at', 'updated_at', 'updated_by', 'started_at', 'completed_at']
        }
    }).then((tasks) => {
        res.status(200)
           .send(tasks);
    }).catch((error) => {
        res.status(500)
           .send(error);
    });

    // let userIdList:number[] = [];
    
    // await taskRespository.find().then((tasks) => {

    //     const all_tasks = tasks.map(task => ({
    //         id          : task.id,
    //         title       : task.title,
    //         content     : task.content,
    //         level       : TaskEnum.levels[task.level],
    //         status      : TaskEnum.statuses[task.status],
    //         deadline    : task.expires_at,
    //         assigned_to : task.user_id,
    //         created_by  : task.created_by,
    //         updated_by  : task.updated_by,
    //     }));

    //     const userIdSet = new Set<number>();

    //     all_tasks.forEach(task => {
    //         userIdSet.add(task.assigned_to);
    //         userIdSet.add(task.created_by);
    //     });

    //     userIdList = Array.from(userIdSet);
    // }).catch((error) => {
    //     res.status(500)
    //        .send(error);
    // });


    // let tempUserList = await userRespository.find({
    //     where: {
    //         id: In(userIdList)
    //     }
    // }).then((users) => {

    //     let tempUserList:any = {};
    //     for(let i of users)
    //     {
    //         tempUserList[i.id] = {
    //             id          : i.id,
    //             first_name  : i.first_name,
    //             last_name   : i.last_name,
    //             email       : i.email,
    //             mobile      : i.mobile,
    //             role        : i.role,
    //             department  : i.department,
    //         };
    //     }
    //     return tempUserList;
    // }).catch((error) => {
    //     res.status(500)
    //        .send(error);
    // });

    // let response:any = {};
    // for(let i of all_tasks)
    // {

    // }
}


export async function createTask(req:Request, res:Response)
{
    if(!req.body.title || !req.body.content || !req.body.level || !req.body.status || !req.body.assigned_to || !req.body.deadline)
    {
        res.status(400)
           .send({
               message: 'All fields are required',
               status : 400,
               success: false
           });
        return;
    }

    try
    {
        let expires_at = format(new Date(req.body.deadline), "yyyy-MM-dd 23:59:59 xxxx");

        const newTask = await Task.create({
            title       : req.body.title,
            content     : req.body.content,
            user_id     : req.body.assigned_to,
            status      : req.body.status,
            level       : req.body.level,
            deadline    : expires_at,
            created_by  : req.body.user.id,
            updated_by  : req.body.user.id,
        }).then((task) => {
            res.status(200)
               .send({
                   message: 'Task created successfully',
                   status : 200,
                   success: true,
                   task   : task
               });
        }).catch((error) => {    
            res.status(500)
                .send({
                    message: 'Something went wrong',
                    status : 500,
                    success: false
                });
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