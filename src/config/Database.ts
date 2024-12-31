import { Sequelize } from "sequelize";


export const sequelizeConnection = new Sequelize(
    process.env.DB_NAME || "task",
    process.env.DB_USER || "root",
    process.env.DB_PASS || "",
    {
        host        : process.env.DB_HOST || "localhost",
        dialect     : "mysql",
        port        : 3306,
        logging     : false
    }
);  