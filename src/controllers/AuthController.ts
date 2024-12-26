import User from "../models/UserModel";
import jwt from 'jsonwebtoken';
import { Token } from "../interfaces/RequestInterfaces";
import dotenv from 'dotenv';

dotenv.config();


export function getJwtToken(user:User, expiresIn:string='1h'):string
{
    const payload = {
        id          : user.id,
        email       : user.email,
        role        : user.role,
        department  : user.department
    };

    if(process.env.APP_SECRET_KEY)
    {
        const accessToken   = jwt.sign(payload, process.env.APP_SECRET_KEY, {expiresIn});
        
        return accessToken;
    }
    else
    {
        throw new Error('SECRET KEY is not defined');
    }
}


export function verifyAccessToken(token:string):any
{
    if(!process.env.APP_SECRET_KEY)
    {
        throw new Error('SECRET KEY is not defined');
    }

    return jwt.verify(token, process.env.APP_SECRET_KEY)
}

