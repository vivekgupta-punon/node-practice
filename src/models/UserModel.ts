import { sequelizeConnection } from "../config/Database";
import { DataTypes } from "sequelize";
import Task from "./TaskModel";
import { AssociableModel } from "../interfaces/sequelizeInterface";


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


const User = sequelizeConnection.define("users", {
    id          : {
                    type            : DataTypes.INTEGER,
                    primaryKey      : true,
                    autoIncrement   : true
                },
    first_name  : {
                    type            : DataTypes.STRING,
                    allowNull       : false
                },
    last_name   : {
                    type            : DataTypes.STRING,
                    allowNull       : false
                },
    email       : {
                    type            : DataTypes.STRING,
                    allowNull       : false,
                    unique          : true
                },
    mobile      : {
                    type            : DataTypes.INTEGER,
                    allowNull       : true,
                    unique          : true
                },
    password    : {
                    type            : DataTypes.STRING,
                    allowNull       : false
                },
    type        : {
                    type            : DataTypes.SMALLINT,
                    allowNull       : false,
                    defaultValue    : 0
                },
    role        : {
                    type            : DataTypes.SMALLINT,
                    allowNull       : false,
                    defaultValue    : UserEnum.ROLE_USER
                },
    department  :  {
                    type            : DataTypes.SMALLINT,
                    allowNull       : true
                },
    designation : {
                    type            : DataTypes.STRING,
                    allowNull       : true
                },
    status      : {
                    type            : DataTypes.SMALLINT,
                    allowNull       : false,
                    defaultValue    : UserEnum.STATUS_ACTIVE
                },
    manager     : {
                    type            : DataTypes.INTEGER,
                    allowNull       : true
                },
    created_by  : {
                    type            : DataTypes.INTEGER,
                    allowNull       : true,
                },
    updated_by  : {
                    type            : DataTypes.INTEGER,
                    allowNull       : true,
                }
},
{
    timestamps  : true,
    createdAt   : "created_at",
    updatedAt   : "updated_at"
}) as AssociableModel;

User.associate = () => {
    User.hasMany(Task, { foreignKey: 'user_id', as: 'tasks' });
};

export default User;