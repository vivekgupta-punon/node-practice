import User from "../models/UserModel";
import jwt from 'jsonwebtoken';



function getJwtToken(user: User, expiresIn: string = '1h'): string
{
    const payload = {
        id          : user.id,
        email       : user.email,
        role        : user.role,
        department  : user.department
    };

    const token = jwt.sign(payload, 'sdfsdfsdf', { expiresIn: expiresIn });
    return token;
}
