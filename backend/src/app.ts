import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
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
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'fileDirectory')));
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'emailTemplates'));

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
