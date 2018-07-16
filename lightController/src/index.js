import express from "express";
import http from "http";
import SignallerComunicationHandler  from "./handler/signallerComunicationHandler"
import lightChangeJob from './jobs/lightChangeJob';

const app = express();
const serverPort = 8080;
const server = http.createServer(app);

SignallerComunicationHandler.startWebSocketServer(server);

server.listen(serverPort, () => {
    console.log(`Websocket server started on port ` + serverPort);
});