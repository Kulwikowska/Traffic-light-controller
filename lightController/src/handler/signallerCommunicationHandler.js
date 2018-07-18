import Server from 'socket.io';
import ConnectedSignallersRegistry from '../repository/connectedSignallersRegistry';
import {Signaller} from '../model/signaller';

let io = null;
const socketClients = {};

export default {
    startSocketServer(server) {
        io = new Server(server, {path: "/signallers"});
        io.on('connection', function(socketClient){
            console.log(`Signaller connected: ${socketClient.id}`);
            socketClient.on('message', function incoming(message) {
                const signallerId = message.id;
                const messageStatus = message.status;
                switch(messageStatus){
                    case 'Signaller activated':
                        try {
                            const signaller = ConnectedSignallersRegistry.addSignaller(signallerId);
                            socketClients[socketClient.id] = {
                                client: socketClient,
                                signallerId: signallerId
                            };
                            socketClient.emit('message', signaller.currentColor);
                        } catch (e) {
                            console.log(e);
                        }  
                        break;
                    default:
                        console.log("no message status defined");
                }
            });
            socketClient.on('disconnect', function () {
                ConnectedSignallersRegistry.deactivateSignaller(socketClients[socketClient.id].signallerId);
                socketClients[socketClient.id] = null;
                console.log('signaller deactivated');
            });
        });  
    },
    sendColorToSignaller(signallerId, currentColor){
        for(let [key, value] of Object.entries(socketClients)) {
            if(value.signallerId == signallerId) {
                value.client.emit('message', currentColor);
                return;
            }
        }       
    }
}
