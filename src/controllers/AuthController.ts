import User from "../models/UserModel";
import { UserInterface } from "../interfaces/UserInterfaces";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export function generateAccessToken(user:UserInterface, expiresIn:string='24h'):string
{
    if(user && process.env.APP_ACCESS_TOKEN)
    {
        const payload = {
            id          : user.id,
            role        : user.role,
            department  : user.department
        };
        const accessToken   = jwt.sign(payload, process.env.APP_ACCESS_TOKEN, {expiresIn});
        
        return accessToken
    }

    return '';
}

export function generateRefreshToken(user:UserInterface, expiresIn:string='30d'):string
{
    if(user && process.env.APP_REFRESH_TOKEN)
    {
        const payload = {
            id          : user.id,
            role        : user.role,
            department  : user.department
        };
        const refreshToken   = jwt.sign(payload, process.env.APP_REFRESH_TOKEN, {expiresIn});
        
        return refreshToken
    }

    return '';
}


export function verifyAccessToken(token:string):any
{
    if(!process.env.APP_ACCESS_TOKEN)
        throw new Error('SECRET KEY is not defined');

    return jwt.verify(token, process.env.APP_ACCESS_TOKEN)
}

export function verifyRefreshToken(token:string):any
{
    if(!process.env.APP_REFRESH_TOKEN)
        throw new Error('SECRET KEY is not defined');

    return jwt.verify(token, process.env.APP_REFRESH_TOKEN)
}

