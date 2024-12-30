import { Request } from "express";
import { Sequelize,Op } from "sequelize";
import User, { UserEnum } from '../models/UserModel';


export default function userSearch(req:Request)
{
    const currentUser   = req.body.user;
    let where:any       = {};

    if(req.query.role)
    {
        if(currentUser.role == UserEnum.ROLE_USER)
        {
            where[Op.and] = [
                {role: {[Op.in]: [UserEnum.ROLE_USER]}},
                {role: {[Op.in]: [req.query.role]}}
            ]
        }
        else
        {
            where[Op.and] = {role: {[Op.in]: [req.query.role]}};
        }
    }

    if(req.query.name)
    {
        where[Op.or] = [
            {first_name: {[Op.substring]: req.query.name}},
            {last_name: {[Op.substring]: req.query.name}}
        ];
    }


    return where;
}