import { sequelizeConnection } from "../config/Database";
import { DataTypes } from "sequelize";


export const Authentication = sequelizeConnection.define('authentication', {
    id              : {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },
    refresh_token   : {
                        type: DataTypes.STRING,
                        unique: true
                    },
    user_id         : {
                        type: DataTypes.INTEGER
                    },
    expires_at      : {
                        type: DataTypes.DATE
                    }
    
},
{
    timestamps      : true,
    createdAt       : 'created_at',
    updatedAt       : 'updated_at'
});


export default Authentication