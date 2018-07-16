import express from "express";
import http from "http";

const app = express();
const serverPort = 8080;
const server = http.createServer(app);

server.listen(serverPort, () => {
    console.log(`Websocket server started on port ` + serverPort);
});