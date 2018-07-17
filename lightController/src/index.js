import express from "express";
import http from "http";
import bodyParser from 'body-parser';
import SignallerComunicationHandler  from "./handler/signallerComunicationHandler"
import lightChangeJob from './jobs/lightChangeJob';
import signallersRoutes from './routes/signallersRoutes';

const app = express();
const serverPort = 8080;
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.use('/signallers', signallersRoutes());

SignallerComunicationHandler.startWebSocketServer(server);

server.listen(serverPort, () => {
    console.log(`Websocket server started on port ` + serverPort);
});