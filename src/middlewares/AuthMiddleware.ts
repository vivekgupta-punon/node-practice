import express, { Request, Response, NextFunction, RequestHandler } from "express";
import jwt  from "jsonwebtoken";
import User from '../models/UserModel';
import Authentication from "../models/AuthModel";
import AppDataSource from "../config/Database";



const AuthUser = async (req:Request, res:Response, next:NextFunction) => {
    const headers = req.headers;

    if(!process.env.APP_SECRET_KEY)
    {
        res.status(401).send({
            message: "Something went wrong"
        });
        return;
    }

    if((headers as any).authorization && process.env.APP_SECRET_KEY)
    {
        let token = (headers as any).authorization;
        token = token.split(' ')[1];
        try
        {
            const authRepository = AppDataSource.getRepository(Authentication);
            const authModel  = await authRepository.findOneBy({
                token: token
            });

            if(!authModel)
            {
                res.status(401).send({
                    message: "Unauthorized"
                });
                return;
            }

            const userRepository = AppDataSource.getRepository(User);
            const userModel      = await userRepository.findOneBy({
                id: authModel.user_id
            })

            // const user = jwt.verify(token, process.env.APP_SECRET_KEY);
            req.body.user = userModel;
        }
        catch(error)
        {
            // res.clearCookie('token');
            res.status(401).send(error);
            return;
        }
    }


    if(req.body.user)
    {
        next();
    }
    else
    {
        res.status(401).send({
            message: "Unauthorized"
        });
        return;
    }
}

export default AuthUser;