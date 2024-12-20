import "reflect-metadata";
import express from 'express';
import AppDataSource  from './config/Database';
import userRouter from './routes/UserRoutes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

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
