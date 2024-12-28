import { NextFunction, Request, Response, CookieOptions } from 'express-serve-static-core';
// import { CreateUserInterface } from '../interfaces/UserInterfaces';
import { CreateUserInterface, UserInterface } from '../interfaces/UserInterfaces';
import User, { UserEnum } from '../models/UserModel';
import Task from '../models/TaskModel';
import Authentication from '../models/AuthModel';
// import AppDataSource from '../config/Database';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from './AuthController';



export async function getUsers(req:Request, res:Response, next:NextFunction)
{
    const users = await User.findAll({
        // include     : [Task],
        attributes  : ['id', 'first_name', 'last_name', 'email', 'mobile', 'role', 'department']
    }).then((users) => {
        res.status(200)
           .send(users);
    }).catch((error) => {
        res.status(500)
           .send(error);
    });
}


export async function getUserById(req:Request, res:Response, next:NextFunction)
{
    if(!req.params.id)
    {
        res.status(400)
           .send('User ID is required');
        return;
    }

    
    await User.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    }).then((user) => {
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


export async function loginUser(req:Request, res:Response):Promise<any>
{
    const {email, password} = req.body;

    if(!email || !password)
    {
        res.status(400)
       .json({
           message  : 'Email and password are required',
           success  : false,
           status   : 404,
           user     : {}
        });
    }

    const userModel = await User.findOne({
        where: {
            email: email
        }
    }) as unknown as UserInterface;


    if(!userModel)
    {
        res.status(404)
       .json({
           message  : 'User not found',
           success  : false,
           status   : 404,
           user     : {}
        });
    }
    else
    {
        let isPasswordValid = await bcrypt.compare(password, userModel.password);
        if(isPasswordValid === false)
        {
            res.status(400)
           .json({
               message  : 'Invalid email or password',
               success  : false,
               status   : 400,
               user     : {}
            });
        }
        else
        {
            const accessToken   = generateAccessToken(userModel);
            const refreshToken  = generateRefreshToken(userModel);
        
            await Authentication.destroy({
                where: {
                    user_id: userModel.id
                }
            });

            const newAuth = await Authentication.create({
                refresh_token    : refreshToken,
                user_id          : userModel.id,
                expires_at       : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            }).then((auth) => {
                res.status(200)
                   .cookie('refreshToken', refreshToken)
                   .cookie('accessToken', accessToken)
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
            }).catch((error) => {
                res.status(500)
                   .send(error);
            });
        }
    }


}


export async function logoutUser(req:Request, res:Response)
{
    if(!req.body.id)
    {
        res.status(400)
           .send('User ID is required');
        return;
    }


    let rowDeleted = await Authentication.destroy({
        where: {
            user_id: req.body.id
        }
    });

    if(rowDeleted === 0)
    {
        res.status(404)
           .send({
               message: 'User not found',
               success: false,
               status : 404,
           });
    }
    else
    {
        res.status(200)
           .clearCookie('refreshToken')
           .clearCookie('accessToken')
           .send({
               message: 'User logged out successfully',
               success: true,
               status : 200,
           });
    }

}


export async function createUser(req:Request, res:Response)
{
    const body = req.body as unknown as CreateUserInterface; 

    if(body.first_name && body.last_name && body.email && body.mobile && body.password && body.confirm_password)
    {
        if(body.password !== body.confirm_password)
        {
            res.status(400)
            .send({
                message: 'Password and confirm password do not match',
                success: false,
                status : 400,
            });
            return;
        }
        if(body.mobile.length !== 10)
        {
            res.status(400)
            .send({
                message: 'Mobile number must be 10 digits',
                success: false,
                status : 400,
            });
            return;
        }
        if(body.password.length < 6)
        {
            res.status(400)
            .send({
                message: 'Password must be at least 6 characters',
                success: false,
                status : 400,
            });
            return;
        }

        body.password   = await bcrypt.hash(body.password, 10);
        body.first_name = body.first_name.trim().toLocaleLowerCase();
        body.last_name  = body.last_name.trim().toLocaleLowerCase();
        body.email      = body.email.trim().toLocaleLowerCase();
        body.mobile     = body.mobile.trim();

        const newUser =  await User.create({
            first_name  : body.first_name,
            last_name   : body.last_name,
            email       : body.email,
            mobile      : body.mobile,
            password    : body.password,
        }).then((user) => {
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

        console.log(newUser);
    }
    else
    {
        res.status(400)
        .send({
            message: 'All fields are required',
            success: false,
            status : 400,
        });
        return;
    }
}


export async function deleteUser(req:Request, res:Response, next:NextFunction)
{
    let body = req.body;


    if(body.id)
    {
        await User.update(
            {
                status: UserEnum.STATUS_INACTIVE
            },
            {
                where: { id: body.id }
            }
        ).then((user) => {
            res.status(200)
               .send({
                    message: 'User deleted successfully',
                    user   : user,
                    status : 200,
                    success: true,
               });
        });
    }
    else
    {
        res.status(400)
           .send('User ID is required');
    }
}


export async function updateUser(req:Request, res:Response, next:NextFunction)
{
    let body                = req.body;
    let updateObject:any    = {};

    if(body.first_name)
        updateObject['first_name']  = body.first_name;
    if(body.last_name)
        updateObject['last_name']   = body.last_name;
    if(body.email)
        updateObject['email']       = body.email;
    if(body.mobile)
        updateObject['mobile']      = body.mobile;
    if(body.type)
        updateObject['type']        = body.type;
    if(body.role)
        updateObject['role']        = body.role;
    if(body.department)
        updateObject['department']  = body.department;
    if(body.designation)
        updateObject['designation'] = body.designation;
    if(body.status)
        updateObject['status']      = body.status;
    if(body.getManager)
        updateObject['manager']     = body.getManager;



    if(body.id)
    {
        await User.update(updateObject,
            {
                where: { id: body.id }
            }
        ).then((user) => {
            res.status(200)
               .send({
                    message: 'User updated successfully',
                    user   : user,
                    status : 200,
                    success: true,
               });
        }).catch((error) => {
            res.status(500)
               .send(error);
        });
    }
    else
    {
        res.status(400)
           .send('User ID is required');
    }
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