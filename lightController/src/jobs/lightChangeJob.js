import schedule from 'node-schedule'
import signallerComunicationHandler from '../handler/signallerComunicationHandler';
import connectedSignallersRegistry from '../repository/connectedSignallersRegistry';
import {Signaller} from '../model/signaller';
var j = schedule.scheduleJob('*/1 * * * * *', function() {
    var signallers = connectedSignallersRegistry.findAllSignallers();
    for(let signaller of signallers) {
        if (signaller.active == true && signaller.date <= (Date.now() - 5000)){
            switch(signaller.currentColor){
                case 'red':
                    signaller.currentColor = 'red_yellow';
                    break;
                case 'red_yellow':
                    signaller.currentColor = 'green';
                    break;
                case 'green':
                    signaller.currentColor = 'yellow';
                    break;
                case 'yellow':
                    signaller.currentColor = 'red';
                    break;
                default:
                    console.log("color is not defined");
            }
            signaller.date = Date.now();
            signallerComunicationHandler.sendColorToSignaller(signaller.signallerId, signaller.currentColor);
        }
    }

    });
