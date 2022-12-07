import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import path from 'path';
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

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'fileDirectory', 'photos')));
app.use(express.static(path.join(__dirname, 'fileDirectory', 'videos')));
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
