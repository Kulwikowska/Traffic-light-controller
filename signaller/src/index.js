import express from 'express';
import config from './configuration/config';
import {io} from './handler/socketClientController';
import {Message} from './model/message';

const app = express();

const server = app.listen(config.port, () => {
    console.log('Service started on port :' + config.port);   
});