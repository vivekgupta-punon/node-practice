import { DataSource } from "typeorm";
import User from "../models/UserModel";
import Authentication from "../models/AuthModel";

const AppDataSource:DataSource = new DataSource({
    type        : "mysql",
    host        : process.env.DB_HOST || "localhost",
    port        : 3306,
    username    : process.env.DB_USER || "root",
    password    : process.env.DB_PASS || "",
    database    : process.env.DB_NAME || "practice",
    // logging : true,
    entities    : [User, Authentication],
    synchronize : true
});


export default AppDataSource;   