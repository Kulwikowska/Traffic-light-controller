import WebSocket from 'ws';
import config from '../configuration/config';
import {Message} from '../model/message';

const ws = new WebSocket(`ws://${config.lightControllerAdress}`);

  ws.on('open', function open() {
    console.log('Signaller is connected');
    try {
      ws.send(JSON.stringify(new Message('Signaller activated', config.id)));
    } catch (error) {
      console.log(error);
    }
  });

ws.on('message', function incoming(data) {
  console.log("Current color: " + data);
});

export default ws;