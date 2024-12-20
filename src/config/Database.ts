import { DataSource } from "typeorm";
import User from "../models/UserModel";

const AppDataSource:DataSource = new DataSource({
    type        : "mysql",
    host        : "localhost",
    port        : 3306,
    username    : "root",
    password    : "",
    database    : "practice",
    // logging : true,
    entities    : [User],
    synchronize : true
});


export default AppDataSource;   