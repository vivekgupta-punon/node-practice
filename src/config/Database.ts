// import { DataSource } from "typeorm";
// import User from "../models/UserModel";
// import Authentication from "../models/AuthModel";
// import Task from "../models/TaskModel";
// import Log from "../models/LogModel";

import { Sequelize } from "sequelize";

// const AppDataSource:DataSource = new DataSource({
//     type        : "mysql",
//     host        : process.env.DB_HOST || "localhost",
//     port        : 3306,
//     username    : process.env.DB_USER || "root",
//     password    : process.env.DB_PASS || "",
//     database    : process.env.DB_NAME || "practice",
//     // logging : true,
//     entities    : [User, Authentication, Task, Log],
//     synchronize : true
// });


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


// const connectSequelize = async () => {
//     try
//     {
//         await sequelizeConnection.authenticate();
//         console.log('Database connected');
//     }
//     catch (error)
//     {
//         console.error('Unable to connect to the database:', error);
//     }
// }


// export default connectSequelize;

// export default AppDataSource;   