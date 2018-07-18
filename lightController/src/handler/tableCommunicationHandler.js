import Server from 'socket.io';
import ConnectedSignallersRegistry from '../repository/connectedSignallersRegistry';

let io = null;
const socketClients = {};

export default {
    startSocketServer(server) {
        console.log("Starting socket.");
        io = new Server(server, {path: "/gui"});
        console.log("Starting socket 2.");
        io.on('connection', function(socketClient){
            console.log(`GUI connected: ${socketClient.id}`);
            socketClient.on('disconnect', function () {
                console.log('gui deactivated');
            });
        })
        },
        sendDataToGui(data){
            io.emit('message', data);
    }
}


