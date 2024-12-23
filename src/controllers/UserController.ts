// import { Request, Response } from 'express';
import { NextFunction, Request, Response, CookieOptions } from 'express-serve-static-core';
import { CreateUserInterface } from '../interfaces/UserInterfaces';
import User, { UserEnum } from '../models/UserModel';
import Authentication from '../models/AuthModel';
import AppDataSource from '../config/Database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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


export async function loginUser(req:Request, res:Response)
{
    if(!req.body.email || !req.body.password)
    {
        res.status(400)
           .send({
               message: 'Email and password are required',
               success: false,
               status : 400,
           });
    }

    let user = await userRepository.findOneBy({email: req.body.email});

    if(!user || !await bcrypt.compare(req.body.password, user.password))
    {
        res.status(401)
           .send({
               message: 'Invalid email or password',
               success: false,
               status : 401,
           });
    }

    const token             = jwt.sign(user!, process.env.APP_SECRET_KEY!, {expiresIn: '24h'});
    const authRepository    = AppDataSource.getRepository(Authentication);

    // code to delete all entries in the authentication table that have expired
    
    let auths = await authRepository.createQueryBuilder()
                                    .delete()
                                    .from(Authentication)
                                    .where("expires_at < :now", { now: new Date().toISOString() })
                                    .execute();


    let newAuth = new Authentication();
    newAuth.token          = token;
    newAuth.refresh_token  = '';
    newAuth.user_id        = user!.id;
    newAuth.expires_at     = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    authRepository.save(newAuth);


    // res.cookie('token', token, {
    //     httpOnly: true
    // });

    let userObject = {};
    if(user)
    {
        userObject = {
            id         : user.id,
            first_name : user.first_name,
            last_name  : user.last_name,
            email      : user.email,
            mobile     : user.mobile,
            type       : user.type,
            role       : user.role,
            department : user.department,
            token      : token
        };
    }

    res.status(200).send({
        message: 'Login successful',
        success: true,
        status : 200,
        user   : userObject,
    });
}


export async function createUser(req:Request, res:Response)
{
    let user: CreateUserInterface = req.body;   

    let newUser = new User();
    newUser.first_name  = user.first_name;
    newUser.last_name   = user.last_name;
    newUser.email       = user.email;
    newUser.mobile      = user.mobile;
    newUser.password    = await bcrypt.hash(user.password, 10);
    newUser.type        = user.type;
    newUser.role        = user.role;
    newUser.department  = user.department;

    userRepository.save(newUser).then((user) => {
        res.status(201)
           .send({
                message: 'User created successfully',
                user   : user,
                status : 201,
                success: true,
           });
    }).catch((error) => {
        res.status(500)
           .send(error);
    });
}


export function getUsersEnums(req:Request, res:Response, next:NextFunction)
{
    res.status(200)
       .send({
           statuses   : UserEnum.statuses,
           roles      : UserEnum.roles,
           departments: UserEnum.departments,
       });
}