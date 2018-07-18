import SocketIo from 'socket.io-client';
import config from '../configuration/config';
import {Message} from '../model/message';

const io = SocketIo.connect(`http://${config.lightControllerAdress}`, {path: "/signallers"});
io.on('connect', function (socket) {
  console.log('Signaller is connected');
  try {
    io.emit('message', new Message('Signaller activated', config.id));
  } catch (error) {
    console.log(error);
  }
});

io.on('message', function incoming(data) {
  console.log("Current color: " + data);
});

export default io;