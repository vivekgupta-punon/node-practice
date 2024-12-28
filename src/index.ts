import "reflect-metadata";
import express from 'express';
// import AppDataSource  from './config/Database';
import userRouter from './routes/UserRoutes';
import taskRouter from './routes/TaskRoutes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import { sequelizeConnection } from "./config/Database";
import modelsSync from "./models/modelsSync";

const app   = express();
const PORT  = 3000;

app.use(cors({
    // origin          : 'http://localhost:4200',
    credentials     : true,
    // methods         : ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders  : ['Content-Type', 'Authorization']
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// connect to database
// sequelizeConnection();
sequelizeConnection.authenticate().then(() => {
    modelsSync();
    console.log('Database connection has been established successfully.');
});

app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);


// if no route found, return 404
app.use(async (req, res, next) => {
    res.status(404).send('Resource not found');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
