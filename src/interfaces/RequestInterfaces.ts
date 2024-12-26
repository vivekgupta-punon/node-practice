export interface RequestWithUser extends Request
{
    user?: any;
}


export interface Token
{
    accessToken: string;
    refreshToken: string;
}