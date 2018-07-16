import express from 'express';
import config from './configuration/config';

const app = express();

const server = app.listen(config.port, () => {
    console.log('Service started on port :' + config.port);   
});