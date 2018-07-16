import express from 'express';
import config from './configuration/config';
import ws from './handler/webSocketClientController';
import {Message} from './model/message';

const app = express();

const server = app.listen(config.port, () => {
    console.log('Service started on port :' + config.port);   
});

process.on('SIGINT', function close() {
  ws.send(JSON.stringify(new Message('Signaller deactivated', config.id)));
  process.exit();
});