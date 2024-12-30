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
        include: [
            { model: User, as: 'assignedTo', attributes: ['id', 'first_name', 'last_name'] },
            { model: User, as: 'createdBy', attributes: ['id', 'first_name', 'last_name'] },
            { model: User, as: 'updatedBy', attributes: ['id', 'first_name', 'last_name'] },
        ],
        attributes: {
            exclude: ['user_id', 'created_by', 'updated_by'],
        }
    });

    res.status(200)
       .send(tasks);
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