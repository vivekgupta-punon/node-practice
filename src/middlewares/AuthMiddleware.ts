import { Request, Response, NextFunction } from "express";
import User from '../models/UserModel';
import { UserInterface } from "../interfaces/UserInterfaces";
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
        const userModel         = await User.findOne({
                                                        where: {
                                                            id: payload?.id,
                                                            role: payload?.role
                                                        }
                                                    }) as unknown as UserInterface;

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
