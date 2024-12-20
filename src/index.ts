import "reflect-metadata";
import express from 'express';
import AppDataSource  from './config/Database';
import userRouter from './routes/UserRoutes';

import {UserEnum} from './models/UserModel';

const app   = express();
const PORT  = 3000;

AppDataSource.initialize().then(() => {
    console.log('Database connected');
}).catch((error) => {
    console.log('Error connecting to database', error);
});

app.use(express.json());
app.use('/api/user', userRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
