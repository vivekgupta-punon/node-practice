import express, { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";
import AppDataSource from '../config/Database';
import User from '../models/UserModel';


const cookieJwtAuth = (req: Request|any, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    try
    {
        const user = jwt.verify(token, process.env.APP_SECRET_KEY!);
        req.user = user;
        next();
    }
    catch(error)
    {
        res.clearCookie('token');
        return res.status(401).send({
            message: "Unauthorized",
        });
    }
}

export default cookieJwtAuth;

// const isLoggedIn = async (req: Request|any, res: Response, next: NextFunction) => {
//     try
//     {
//         const { authorization } = req.headers;
//         if(!authorization)
//         {
//             return res.status(401).send({
//                 message: "Unauthorized",
//             });
//         }

//         const accessToken   = authorization.split(" ")[1];
//         const payload       = await jwt.verify(accessToken, process.env.APP_SECRET_KEY!);

//         const { id } = payload as any;

//         if(!id)
//         {
//             return res.status(401).send({
//                 message: "Unauthorized",
//             });
//         }

//         const userRepository    = AppDataSource.getRepository(User);
//         const user              = await userRepository.findOneBy({id: id});

//         if(!user)
//         {
//             return res.status(401).send({
//                 message: "Unauthorized",
//             });
//         }

//         req.user = user;
//         next();
//     }
//     catch(error)
//     {
//         if(error instanceof jwt.TokenExpiredError)
//         {
//             return res.status(401).send({
//                 message: "Login Session expired!"
//             });
//         }
//         return res.status(500).send({
//             message: "Server error"
//         });
//     }
// }


// export default isLoggedIn;