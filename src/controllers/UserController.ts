// import { Request, Response } from 'express';
import { NextFunction, Request, Response, CookieOptions } from 'express-serve-static-core';
import { CreateUserInterface } from '../interfaces/UserInterfaces';
import User, { UserEnum } from '../models/UserModel';
import Authentication from '../models/AuthModel';
import AppDataSource from '../config/Database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from './AuthController';


const userRepository = AppDataSource.getRepository(User);

export function getUsers(req:Request, res:Response, next:NextFunction)
{
    userRepository.find().then((users) => {
        res.status(200)
           .send(
                users.map(user => ({
                    first_name  : user.first_name,
                    last_name   : user.last_name,
                    email       : user.email,
                    mobile      : user.mobile,
                    role        : UserEnum.roles[user.role],
                    department  : UserEnum.departments[user.department]
                }))
            );
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
    const {email, password} = req.body;

    if(!email || !password)
    {
        throw new Error('Email and Password both are required');
    }

    const userModel = await userRepository.findOneBy({email: email});

    if(!userModel)
    {
        throw new Error('User not found');
    }
    if(!await bcrypt.compare(password, userModel.password))
    {
        throw new Error('Invalid email or password');
    }


    const accessToken   = generateAccessToken(userModel);
    const refreshToken  = generateRefreshToken(userModel);

    const authRepository = AppDataSource.getRepository(Authentication);

    await authRepository.delete({user_id: userModel.id});

    let newAuth = new Authentication();
    newAuth.refresh_token  = refreshToken;
    newAuth.user_id        = userModel.id;
    newAuth.expires_at     = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    await authRepository.save(newAuth);


    const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: true,
    };


    res.status(200)
       .cookie('refreshToken', refreshToken, cookieOptions)
       .cookie('accessToken', accessToken, cookieOptions)
       .json({
           message: 'User logged in successfully',
           success: true,
           status : 200,
           accessToken: accessToken,
           refreshToken: refreshToken,
           user: {
               first_name  : userModel.first_name,
               last_name   : userModel.last_name,
               email       : userModel.email,
               mobile      : userModel.mobile,
               role        : UserEnum.roles[userModel.role],
               department  : UserEnum.departments[userModel.department]
           }
        });
}


export async function logoutUser(req:Request, res:Response)
{
    const authRepository = AppDataSource.getRepository(Authentication);
    await authRepository.delete({user_id: req.body.id});

    const cookieOptions:CookieOptions = {
        httpOnly: true,
        secure: true,
        expires: new Date(0)
    };
    res.status(200)
       .clearCookie('refreshToken', cookieOptions)
       .clearCookie('accessToken', cookieOptions)
       .send({
           message: 'User logged out successfully',
           success: true,
           status : 200,
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