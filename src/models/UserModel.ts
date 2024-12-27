import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import Task from "./TaskModel"

export class UserEnum
{
    static STATUS_ACTIVE    = 1;
    static STATUS_INACTIVE  = 0;

    static statuses = {
        [UserEnum.STATUS_ACTIVE]   : "Active",
        [UserEnum.STATUS_INACTIVE] : "Inactive"
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
        [UserEnum.ROLE_ADMIN]      : "Admin",
        [UserEnum.ROLE_USER]       : "User",
        [UserEnum.ROLE_MANAGER]    : "Manager",
        [UserEnum.ROLE_DEVELOPER]  : "Developer",
        [UserEnum.ROLE_TESTER]     : "Tester",
        [UserEnum.ROLE_DESIGNER]   : "Designer",
        [UserEnum.ROLE_MARKETING]  : "Marketing"
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
        [UserEnum.DEPARTMENT_ADMIN]    : "Admin",
        [UserEnum.DEPARTMENT_IT]       : "IT",
        [UserEnum.DEPARTMENT_DESIGN]   : "Design",
        [UserEnum.DEPARTMENT_MARKET]   : "Marketing",
        [UserEnum.DEPARTMENT_HR]       : "HR",
        [UserEnum.DEPARTMENT_ACCOUNTS] : "Accounts",
        [UserEnum.DEPARTMENT_SUPPORT]  : "Support",
        [UserEnum.DEPARTMENT_SALES]    : "Sales"
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
    last_name: string

    @Column({ unique: true })
    email: string

    @Column({ unique: true })
    mobile: string

    @Column()
    password: string

    @Column({ type: "int", default: null })
    type:number

    @Column({ type: "int", default: UserEnum.ROLE_USER })
    role: number

    @Column({ type: "int" })
    department: number

    @Column()
    designation: string

    @Column({ default: UserEnum.STATUS_ACTIVE })
    status: number

    @Column({ default: null})
    manager: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column({ default: null})
    created_by: number

    @Column({ default: null})
    updated_by: number
}