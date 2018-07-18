# Traffic-light-controller

Intelligent traffic light controller with Vue.js, Socket.io and Node.js.

### Table of contents
* General Info
* Technologies
* Setup
* Status

### General Info 
The project solves the problem of server communication with signalers. Additionally, as a separate application a view of signaling devices is available.

### Technologies
* Node v8.11.1
* Express v4.16.3
* Socket.io-client v2.1.1
* Babel v6
* Vue v2.5.13

### Setup
The project is divided into three applications. Each one should be run separately
* lightController
To run this project, install it locally using npm:

```
$ cd lightController
$ npm install
$ npm start
```
* Signaller
To run this project, install it locally using npm. 
You can choose id of signaller and port. 

```
$ cd signaller
$ npm install
$ npm start --port=<port> --id=<id> --light_controller_adress=<light_controller_host_and_port>
```
* guiSignallers
To run this project, install it locally using npm:

```
$ cd guiSignallers
$ npm run build
$ npm install
$ npm start
```