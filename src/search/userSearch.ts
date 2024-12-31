import { Request } from "express";
import { Sequelize,Op } from "sequelize";
import User, { UserEnum } from '../models/UserModel';


export default function userSearch(req:Request)
{
    const currentUser   = req.body.user;
    let where:any       = {};

    where[Op.and] = {status: {[Op.in]: [UserEnum.STATUS_ACTIVE]}};

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

    if(req.query.email)
    {
        where[Op.and] = [
            {email: {[Op.substring]: req.query.email}}
        ];
    }

    if(req.query.mobile)
    {
        where[Op.and] = [
            {mobile: {[Op.substring]: req.query.mobile}}
        ];
    }

    if(req.query.department)
    {
        where[Op.and] = [
            {department: {[Op.eq]: req.query.department}}
        ];
    }

    if(req.query.status)
    {
        where[Op.and] = [
            {status: {[Op.eq]: req.query.status}}
        ];
    }

    if(req.query.manager)
    {
        where[Op.and] = [
            {manager: {[Op.eq]: req.query.manager}}
        ];
    }

    


    return where;
}