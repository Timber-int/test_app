import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';

import { config } from './config';
import { apiRouter } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const { PORT } = config;

app.use(apiRouter);

// If you start work:
// 1) Install the database MySQL, if it is installed, then create a database with the name "aleannlab";
// 2) Run the "npm run migration:run" command to start the migration.
// 3) Run the "npm run start" command to start the server.

// If your need more information pleace start the server and write to url http://localhost:5000/docs

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
