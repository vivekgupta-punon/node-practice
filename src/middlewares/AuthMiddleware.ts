import express, { Request, Response, NextFunction, RequestHandler } from "express";
import jwt  from "jsonwebtoken";
import User from '../models/UserModel';
import Authentication from "../models/AuthModel";
import AppDataSource from "../config/Database";
import { verifyAccessToken } from "../controllers/AuthController";



export const AuthUser = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
    let accessToken = req.cookies?.accessToken || req.headers?.authorization?.split(' ')[1];

    if(!accessToken)
    {
        accessToken = req.headers?.accesstoken;
    }

    if(!accessToken)
    {
        return res.status(401)
                  .send('Unauthorized Access');
    }

    try 
    {
        const payload           = verifyAccessToken(accessToken);
        const userRepository    = AppDataSource.getRepository(User);
        const userModel         = await userRepository.findOneBy({
                                                        id: payload?.id,
                                                        role: payload?.role
                                                    });

        if(!userModel)
        {
            return res.status(401)
                      .send('Unauthorized Access');
        }

        req.body.user = userModel;
        next();
    }
    catch (error) 
    {
        return res.status(401)
                  .send('Something went wrong');
    }
    
}
