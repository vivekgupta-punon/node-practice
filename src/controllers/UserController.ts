// import { Request, Response } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import { CreateUserInterface } from '../interfaces/UserInterfaces';
import User from '../models/UserModel';
import AppDataSource from '../config/Database';
import bcrypt from 'bcrypt';

const userRepository = AppDataSource.getRepository(User);

export function getUsers(req:Request, res:Response, next:NextFunction)
{
    userRepository.find().then((users) => {
        res.status(200)
           .send(users);
    }).catch((error) => {
        res.status(500)
           .send(error);
    });
}


export function getUserById(req:Request, res:Response, next:NextFunction)
{
    if(!req.params.id)
    {
        res.status(400)
           .send('User ID is required');
    }

    
    userRepository.findOneBy({id: parseInt(req.params.id)}).then((user) => {
        if(user)
        {
            res.status(200)
               .send(user);
        }
        else
        {
            res.status(404)
               .send({
                   message : 'User not found',
               });
        }
    }).catch((error) => {
        res.status(500)
           .send(error);
    });
}


export function createUser(req:Request, res:Response, next:NextFunction)
{
    if(!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password || !req.body.mobile)
    {
        res.status(400)
           .send('All fields are required');
    }

    let password = bcrypt.hashSync(req.body.password, 10);

    const user = new User();
    user.first_name = req.body.first_name;
    user.last_name  = req.body.last_name;
    user.email      = req.body.email;
    user.password   = password;
    user.mobile     = req.body.mobile;
    
    userRepository.save(user).then((user) => {
        res.status(201)
           .send({
                message : 'User created successfully',
                user    : {
                    id        : user.id,
                    first_name: user.first_name,
                    last_name : user.last_name,
                    email     : user.email,
                } 
           });
    }).catch((error) => {
        res.status(500)
           .send({
                message : 'Error creating user',
                error   : error,
           });
    });
}