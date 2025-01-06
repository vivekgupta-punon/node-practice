import { sequelizeConnection } from "../config/Database";
import { DataTypes } from "sequelize";
import { AssociableModel } from "../interfaces/sequelizeInterface";


export class UpdateEnum
{
    static STATUS_COMMITTED = 1;
    static STATUS_UPDATED   = 2;
    static STATUS_CHECKED   = 3;

    static statuses = {
        [UpdateEnum.STATUS_COMMITTED]   : "Committed",
        [UpdateEnum.STATUS_UPDATED]     : "Updated",
        [UpdateEnum.STATUS_CHECKED]     : "Checked"
    }
}


const Update = sequelizeConnection.define("updates", {
    id          : {
                    type            : DataTypes.INTEGER,
                    primaryKey      : true,
                    autoIncrement   : true
                },
    user_id     : {
                    type            : DataTypes.INTEGER,
                    allowNull       : false
                },
    commitment  : {
                    type            : DataTypes.TEXT,
                    allowNull       : false
                },
    update      : {
                    type            : DataTypes.TEXT,
                    allowNull       : false
                },
    comment     : {
                    type            : DataTypes.TEXT,
                    allowNull       : true
                },
    score       : {
                    type            : DataTypes.INTEGER,
                    allowNull       : true
                },
    status      : {
                    type            : DataTypes.INTEGER,
                    defaultValue    : UpdateEnum.STATUS_COMMITTED
                },
    type        : {
                    type            : DataTypes.INTEGER,
                    allowNull       : false
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


export default Update;