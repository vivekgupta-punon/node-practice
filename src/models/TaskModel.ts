import { sequelizeConnection } from "../config/Database";
import { DataTypes } from "sequelize";
import User from "./UserModel";
import { AssociableModel } from "../interfaces/sequelizeInterface";


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
}) as AssociableModel;


Task.associate = () => {
    Task.belongsTo(User, { foreignKey: 'user_id', as: 'assignedTo' });
    Task.belongsTo(User, { foreignKey: 'created_by', as: 'createdBy' });
    Task.belongsTo(User, { foreignKey: 'updated_by', as: 'updatedBy' });
};


export default Task;