import "reflect-metadata";
import express from 'express';
import userRouter from './routes/UserRoutes';
import taskRouter from './routes/TaskRoutes';
import appRouter from './routes/AppRoutes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import User from './models/UserModel';
import Task from './models/TaskModel';

import { sequelizeConnection } from "./config/Database";
import modelsSync from "./models/modelsSync";

const app   = express();
const PORT  = 3000;

app.use(cors({credentials : true}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// connect to database
sequelizeConnection.authenticate().then(() => {
    sequelizeConnection.sync({ force: false }).then(() => {
        console.log("Database synchronized");
    });

    const models = { User, Task };
    Object.values(models).forEach((model) => {
        if(model.associate)
        {
            model.associate(models);
        }
    });
});


app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.use('/api/app', appRouter);


// if no route found, return 404
app.use(async (req, res, next) => {
    res.status(404).send('Resource not found');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
