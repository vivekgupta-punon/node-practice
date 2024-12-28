import { sequelizeConnection } from "../config/Database";
import { DataTypes } from "sequelize";
import User from "./UserModel";


export class TaskEnum
{
    static LEVEL_LOW     = 1;
    static LEVEL_MEDIUM  = 2;
    static LEVEL_HIGHT   = 2;

    static levels = {
        [TaskEnum.LEVEL_LOW]     : "Low",
        [TaskEnum.LEVEL_MEDIUM]  : "Medium",
        [TaskEnum.LEVEL_HIGHT]   : "High",
    }

    static STATUS_PENDING       = 1;
    static STATUS_IN_PROGRESS   = 2;
    static STATUS_COMPLETED     = 3;
    static STATUS_TESTED        = 3;
    static STATUS_CANCELLED     = 4;
    static STATUS_EXPIRED       = 5;

    static statuses = {
        [TaskEnum.STATUS_PENDING]    : "Pending",
        [TaskEnum.STATUS_IN_PROGRESS]: "In Progress",
        [TaskEnum.STATUS_COMPLETED]  : "Completed",
        [TaskEnum.STATUS_CANCELLED]  : "Cancelled",
        [TaskEnum.STATUS_EXPIRED]    : "Backlog"
    }
}


const Task = sequelizeConnection.define('tasks', {
    id          : {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
    title       : {
                    type: DataTypes.STRING
                },
    content     : {
                    type: DataTypes.TEXT
                },
    user_id     : {
                    type: DataTypes.INTEGER,
                    references: {
                        model: User,
                        key: 'id'
                    }
                },
    status      : {
                    type: DataTypes.INTEGER,
                    defaultValue: TaskEnum.STATUS_PENDING
                },
    level       : {
                    type: DataTypes.INTEGER,
                    defaultValue: TaskEnum.LEVEL_LOW
                },
    deadline    : {
                    type: DataTypes.DATE
                },
    started_at  : {
                    type: DataTypes.DATE,
                    allowNull: true
                },
    completed_at: {
                    type: DataTypes.DATE,
                    allowNull: true
                },
    created_by  : {
                    type: DataTypes.INTEGER
                },
    updated_by  : {
                    type: DataTypes.INTEGER
                }
},
{
    timestamps  : true,
    createdAt   : 'created_at',
    updatedAt   : 'updated_at'
});


export default Task;