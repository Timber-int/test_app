import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { createConnection } from 'typeorm';
import { config } from './config';
import { apiRouter } from './routes';

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors(corsOptions));

const { PORT } = config;

app.use(apiRouter);

app.listen(PORT, async () => {
    console.log(`Server has been started on ${PORT} port...`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected...');
        }
    } catch (e) {
        if (e) {
            console.log(e);
        }
    }
});
