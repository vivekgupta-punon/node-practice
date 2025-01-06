import { Request } from "express";
import { Sequelize, Op } from "sequelize";
import Task, { TaskEnum } from '../models/TaskModel';
import User, { UserEnum} from '../models/UserModel';


export default function taskSearch(req:Request)
{
    const currentUser   = req.body.user;
    let where:any       = {};

    where[Op.and] = {status: {[Op.notIn]: [TaskEnum.STATUS_CANCELLED, TaskEnum.STATUS_EXPIRED]}};


    if(!([UserEnum.ROLE_ADMIN, UserEnum.ROLE_DEVELOPER].includes(currentUser.role)))
    {
        where[Op.and] = {user_id: currentUser.id};
    }

    return where;
}