import { Request, Response, NextFunction } from 'express';
import Task, { TaskEnum } from '../models/TaskModel';
import User from '../models/UserModel';
import { format } from 'date-fns';
import taskSearch from '../search/taskSearch';




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

    let conditions  = taskSearch(req);

    const tasks = await Task.findAll({
        where: conditions,
        include: [
            { model: User, as: 'assignedTo', attributes: ['id', 'first_name', 'last_name'] },
            { model: User, as: 'createdBy', attributes: ['id', 'first_name', 'last_name'] },
            { model: User, as: 'updatedBy', attributes: ['id', 'first_name', 'last_name'] },
        ],
        attributes: {
            exclude: ['user_id', 'created_by', 'updated_by'],
        }
    });

    let result:any = {};    
    let temp_status = '';
    for(let [key, value] of Object.entries(TaskEnum.statuses))
    {
        temp_status = value.toLowerCase().replace(' ', '_');
        result[temp_status] = [];
    }

    for(let task of tasks as any)
    {
        task.level = TaskEnum.levels[task.level].toLocaleLowerCase();

        if(task.status == TaskEnum.STATUS_PENDING)
        {
            result['pending'].push(task);
        }
        else if(task.status == TaskEnum.STATUS_IN_PROGRESS)
        {
            result['in_progress'].push(task);
        }
        else if(task.status == TaskEnum.STATUS_COMPLETED)
        {
            result['completed'].push(task);
        }
        else if(task.status == TaskEnum.STATUS_TESTED)
        {
            result['tested'].push(task);
        }
        else if(task.status == TaskEnum.STATUS_CANCELLED)
        {
            result['cancelled'].push(task);
        }
        else if(task.status == TaskEnum.STATUS_EXPIRED)
        {
            result['expired'].push(task);
        }
    }


    res.status(200)
       .send(result);
}

export async function getTask(req:Request, res:Response)
{
    if(req.params.id)
    {
        const task = await Task.findOne({
            where: {
                id: req.params.id
            }
        });

        if(task)
        {
            res.status(200)
               .send(task);
        }
        else
        {
            res.status(404)
               .send({
                   message: 'Task not found',
                   status : 404,
                   success: false
               });
        }
    }
    else
    {
        res.status(400)
           .send({
               message: 'Task ID is required',
               status : 400,
               success: false
           });
    }
}

export async function updateTask(req:Request, res:Response)
{
    if(!req.body.id || !req.body.title || !req.body.content || !req.body.level || !req.body.status || !req.body.assigned_to || !req.body.deadline)
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

        const task = await Task.update(
            {
                title       : req.body.title,
                content     : req.body.content,
                user_id     : req.body.assigned_to,
                status      : req.body.status,
                level       : req.body.level,
                deadline    : expires_at,
                updated_by  : req.body.user.id,
            },
            {
                where: {
                    id: req.body.id
                }
            }
        ).then((task) => {
            res.status(200)
                .send({
                    message: 'Task updated successfully',
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

export async function deleteTask(req:Request, res:Response)
{
    if(!req.body.id)
    {
        res.status(400)
           .send({
               message: 'Task ID is required',
               status : 400,
               success: false
           });
        return;
    }

    try
    {
        const task = await Task.destroy({
            where: {
                id: req.body.id
            }
        }).then((task) => {
            res.status(200)
               .send({
                   message: 'Task deleted successfully',
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