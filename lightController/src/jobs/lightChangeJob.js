import schedule from 'node-schedule'
import signallerComunicationHandler from '../handler/signallerComunicationHandler';
import connectedSignallersRegistry from '../webSockets/connectedSignallersRegistry';
import {Signaller} from '../model/signaller';
var j = schedule.scheduleJob('*/1 * * * * *', function() {
    var signallers = connectedSignallersRegistry.findAllSignallers();
    for (let [id, signaller] of Object.entries(signallers)){
        if (signallers[id].active == true && signallers[id].date <= (Date.now() - 5000)){
            switch(signallers[id].currentColor){
                case 'red':
                signallers[id].currentColor = 'red_yellow';
                    break;
                case 'red_yellow':
                signallers[id].currentColor = 'green';
                    break;
                case 'green':
                signallers[id].currentColor = 'yellow';
                    break;
                case 'yellow':
                signallers[id].currentColor = 'red';
                    break;
                default:
                    console.log("color is not defined");
            }
            signallers[id].date = Date.now();
            signallerComunicationHandler.sendColorToSignaller(id, signallers[id].currentColor);
        }
        };
    });
