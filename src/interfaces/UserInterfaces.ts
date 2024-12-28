export interface CreateUserInterface
{
    first_name      : string,
    last_name       : string,
    email           : string,
    mobile          : string,
    password        : string,
    confirm_password: string,
    // type: number,
    // role: number,
    // department: number,
    // designation: number,
    // status: number,
    // manager: number
}

export interface UserInterface
{
    id          : number,
    first_name  : string,
    last_name   : string,
    email       : string,
    mobile      : string,
    password    : string,
    type        : number,
    role        : number,
    department  : number,
    designation : number,
    status      : number,
    manager     : number,
    created_at  : string,
    updated_at  : string
    created_by  : number,
    updated_by  : number
}