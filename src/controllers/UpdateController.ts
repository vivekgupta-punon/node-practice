import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import Update, { UpdateEnum } from '../models/UpdateModel';


async function isTodayUpdateAdded(user_id:number):Promise<any>
{
    try
    {
        const update = await Update.findOne({
            where: {
                user_id: user_id,
                created_at: {
                    [Op.gte]: new Date().setHours(0, 0, 0, 0),
                    [Op.lt]: new Date().setHours(23, 59, 59, 999),
                },
            },
        });

        return update || false;
    }
    catch(error)
    {
        console.error('Error checking today\'s update:', error);
        return false;
    }
}


export async function getDailyUpdates(req:Request, res:Response, next:NextFunction)
{
    try
    {
        const updates = await Update.findAll() as any[];
        res.status(200)
           .send(updates);
    }
    catch(error)
    {
        res.status(500)
           .send(error);    
    }
}


export async function addCommitment(req:Request, res:Response, next:NextFunction)
{
    if(!req.body.user_id || !req.body.commitment)
    {
        res.status(400)
           .send({
               message: 'All fields are required',
               success: false
           });
        return;
    }

    try
    {

        const isCommitmentAlreadyAdded = await isTodayUpdateAdded(req.body.user.id);
        if(isCommitmentAlreadyAdded)
        {
            res.status(400)
               .send({
                   message: 'You have already added an Commitment for today',
                   success: false
               });
            return;
        }

        const update = await Update.create({
            user_id     : req.body.user_id,
            commitment  : req.body.commitment,
            status      : UpdateEnum.STATUS_COMMITTED,
            created_by  : req.body.user.id,
            updated_by  : req.body.user.id
        });


        res.status(200)
           .send({
               message  : 'Commitment added successfully',
               success  : true,
               status   : 200,
               data     : update
           });
    }
    catch(error)
    {
        res.status(500)
           .send(error);    
    }
}


export async function addUpdate(req:Request, res:Response, next:NextFunction)
{
    if(!req.body.commitment_id)
    {
        res.status(400)
           .send({
               message: 'Something went wrong',
               success: false
           });
        return;
    }

    if(!req.body.user_id || !req.body.update)
    {
        res.status(400)
           .send({
               message: 'All fields are required',
               success: false
           });
        return;
    }

    try
    {
        const update = await Update.create({
            update      : req.body.update,
            status      : UpdateEnum.STATUS_UPDATED,
            updated_by  : req.body.user.id
        });


        res.status(200)
           .send({
               message  : 'Update added successfully',
               success  : true,
               status   : 200,
               data     : update
           });
    }
    catch(error)
    {
        res.status(500)
           .send(error);    
    }
}



export async function updateCommitment(req:Request, res:Response, next:NextFunction)
{
    if(!req.body.commitment_id)
    {
        res.status(400)
           .send({
               message: 'Something went wrong',
               success: false
           });
        return;
    }

    if(!req.body.user_id || !req.body.commitment)
    {
        res.status(400)
           .send({
               message: 'All fields are required',
               success: false
           });
        return;
    }

    try
    {
        const updateModel = await Update.findOne({ where: { id: req.body.commitment_id }});

        if(!updateModel)
        {
            res.status(404)
               .send({
                   message: 'Commitment not found',
                   success: false
               });
            return;
        }



        const update = await Update.update(
            {
                commitment  : req.body.commitment,
                updated_by  : req.body.user.id
            },
            {
                where: {
                    id: req.body.commitment_id
                }
            }
        );


        res.status(200)
           .send({
               message  : 'Commitment updated successfully',
               success  : true,
               status   : 200,
               data     : update
           });
    }
    catch(error)
    {
        res.status(500)
           .send(error);    
    }
}


export async function updateUpdate(req:Request, res:Response, next:NextFunction)
{
    if(!req.body.update_id)
    {
        res.status(400)
           .send({
               message: 'Something went wrong',
               success: false
           });
        return;
    }

    if(!req.body.user_id || !req.body.update)
    {
        res.status(400)
           .send({
               message: 'All fields are required',
               success: false
           });
        return;
    }

    try
    {

        const updateModel = await Update.findOne({ where: { id: req.body.update_id }});

        if(!updateModel)
        {
            res.status(404)
               .send({
                   message: 'Update not found',
                   success: false
               });
            return;
        }

        const update = await Update.update(
            {
                update      : req.body.update,
                updated_by  : req.body.user.id
            },
            {
                where: {
                    id: req.body.update_id
                }
            }
        );


        res.status(200)
           .send({
               message  : 'Update updated successfully',
               success  : true,
               status   : 200,
               data     : update
           });
    }
    catch(error)
    {
        res.status(500)
           .send(error);    
    }
}



export async function checkUpdate(req:Request, res:Response, next:NextFunction)
{
    if(!req.body.update_id)
    {
        res.status(400)
           .send({
               message: 'Something went wrong',
               success: false
           });
        return;
    }

    if(!req.body.comment || !req.body.score)
        {
            res.status(400)
               .send({
                   message: 'All fields are required',
                   success: false
               });
            return;
        }

    try
    {

        const updateModel = await Update.findOne({ where: { id: req.body.update_id }});

        if(!updateModel)
        {
            res.status(404)
               .send({
                   message: 'Update not found',
                   success: false
               });
            return;
        }

        const update = await Update.update(
            {
                comment     : req.body.comment,
                score       : req.body.score,
                updated_by  : req.body.user.id
            },
            {
                where: {
                    id: req.body.update_id
                }
            }
        );


        res.status(200)
           .send({
               message  : 'Update Marked successfully',
               success  : true,
               status   : 200,
               data     : update
           });
    }
    catch(error)
    {
        res.status(500)
           .send(error);    
    }
}