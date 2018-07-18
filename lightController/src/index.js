import express from "express";
import http from 'http';
import bodyParser from 'body-parser';
import signallerCommunicationHandler  from "./handler/signallerCommunicationHandler"
import tableCommunicationHandler from './handler/tableCommunicationHandler';
import lightChangeJob from './jobs/lightChangeJob';
import signallersRoutes from './routes/signallersRoutes';
import cors from 'cors'

const app = express();
const serverPort = 8080;
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({credentials: false}));
app.use('/signallers', signallersRoutes());

signallerCommunicationHandler.startSocketServer(server);
tableCommunicationHandler.startSocketServer(server);

server.listen(serverPort, () => {
    console.log(`Socket server started on port ` + serverPort);
});