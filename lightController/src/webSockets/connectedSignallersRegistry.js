import WebSocket from "ws";
import {Signaller} from '../model/signaller';
import utils from '../utils/utils';

const signallers = {}

const colors = {0:'red', 1:'yellow', 2:'red_yellow', 3:'green'}; 

export default {
    addSignaller(id){
        if (signallers[id] != null){
            if(signallers[id].active) {
                throw Error('Id is in use, make new id');
            }
            signallers[id].active = true;
            signallers[id].date = Date.now();
            signallers[id].currentColor = utils.randomProperty(colors);
            return signallers[id];
        } 
        signallers[id]= new Signaller(true, Date.now(), utils.randomProperty(colors));
        return signallers[id];
    },
    deactivateSignaller(id){
        if(signallers[id] == null){
            throw Error('Id is not in use');
        }
        signallers[id].active = false;
    },
    findAllSignallers(){
        return signallers;
    }
}




