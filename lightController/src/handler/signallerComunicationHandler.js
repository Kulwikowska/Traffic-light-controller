import WebSocket from "ws";
import ConnectedSignallersRegistry from '../webSockets/connectedSignallersRegistry'
import {Signaller} from '../model/signaller';

let wss = null;
const webSocketClients = {};

export default {
    startWebSocketServer(server) {
        wss = new WebSocket.Server({ server });
        wss.on('connection', (webSocketClient, req) => {
            console.log("Signaller connected " + webSocketClient);
            webSocketClient.on('message', function incoming(data) {
                const message = JSON.parse(data);
                const signallerId = message.id;
                const messageStatus = message.status;
                switch(messageStatus){
                    case 'Signaller activated':
                    try {
                        const signaller = ConnectedSignallersRegistry.addSignaller(signallerId);
                        webSocketClients[signallerId] = webSocketClient;
                        webSocketClient.send(signaller.currentColor);
                    } catch (e) {
                        console.log(e);
                    }  
                    break;
                    case 'Signaller deactivated':
                        ConnectedSignallersRegistry.deactivateSignaller(signallerId);
                        webSocketClients[signallerId] = null;
                        console.log('signaller deactivated')
                    break;
                    default:
                        console.log("no message status defined");
                }
            });
        });
    },
    
}