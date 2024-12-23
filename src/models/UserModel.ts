import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

export class UserEnum
{
    static STATUS_ACTIVE    = 1;
    static STATUS_INACTIVE  = 0;

    static statuses = {
        STATUS_ACTIVE   : "Active",
        STATUS_INACTIVE : "Inactive"
    }

    static ROLE_ADMIN       = 1;
    static ROLE_USER        = 2;
    static ROLE_MANAGER     = 3;
    static ROLE_DEVELOPER   = 4;
    static ROLE_TESTER      = 5;
    static ROLE_DESIGNER    = 6;
    static ROLE_MARKETING   = 7;
    static ROLE_HR          = 8;
    static ROLE_ACCOUNTS    = 9;
    static ROLE_SUPPORT     = 10;
    static ROLE_SALES       = 11;


    static roles = {
        ROLE_ADMIN      : "Admin",
        ROLE_USER       : "User",
        ROLE_MANAGER    : "Manager",
        ROLE_DEVELOPER  : "Developer",
        ROLE_TESTER     : "Tester",
        ROLE_DESIGNER   : "Designer",
        ROLE_MARKETING  : "Marketing"
    }

    static DEPARTMENT_ADMIN    = 1;
    static DEPARTMENT_IT       = 2;
    static DEPARTMENT_DESIGN   = 3;
    static DEPARTMENT_MARKET   = 4;
    static DEPARTMENT_HR       = 5;
    static DEPARTMENT_ACCOUNTS = 6;
    static DEPARTMENT_SUPPORT  = 7;
    static DEPARTMENT_SALES    = 8;

    static departments = {
        DEPARTMENT_ADMIN    : "Admin",
        DEPARTMENT_IT       : "IT",
        DEPARTMENT_DESIGN   : "Design",
        DEPARTMENT_MARKET   : "Marketing",
        DEPARTMENT_HR       : "HR",
        DEPARTMENT_ACCOUNTS : "Accounts",
        DEPARTMENT_SUPPORT  : "Support",
        DEPARTMENT_SALES    : "Sales"
    }

}


@Entity({ name: "users" })
export default class User
{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    middle_name: string

    @Column()
    last_name: string

    @Column({ unique: true })
    email: string

    @Column({ unique: true })
    mobile: string

    @Column()
    password: string

    @Column({ type: "int" })
    type:number

    @Column({ type: "int" })
    role: number

    @Column({ type: "int" })
    department: number

    @Column()
    designation: string

    @Column({ default: UserEnum.STATUS_ACTIVE })
    status: number

    @Column()
    manager: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column()
    created_by: number

    @Column()
    updated_by: number
}