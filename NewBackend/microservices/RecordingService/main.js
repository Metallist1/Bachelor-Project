import { createRequire } from 'module'
const require = createRequire(import.meta.url);

import { addCoreEvent, addEndGameStats, addMinorEvent ,addMovementEvent } from './controllers/recording.controller.js'

// Express

const app = require('express')();
const bodyParser = require('body-parser');

const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

//Sockets

const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

// Socket setup
//const io = socket(server);


// Middleware
app.use(bodyParser.json());

app.post('/event', function (req, res) {
    let change = req.body;
    console.log(change);
    eventType = change.event;
    switch(eventType) {
        case "Minor-Event":
            addMinorEvent(change, function(err, eventResult) {
                if (err){
                    console.log(err);
                }
                else{
                    res.send(eventResult);
                }
            });
            break;
        case "Movement-Event":
            addMovementEvent(change, function(err, eventResult) {
                if (err){
                    console.log(err);
                }
                else{
                    res.send(eventResult);
                }
            });
            break;
        case "Core-Event":
            addCoreEvent(change, function(err, eventResult) {
                if (err){
                    console.log(err);
                }
                else{
                    res.send(eventResult);
                }
            });
            break;
        default:
            res.status(400).send({
                message: 'No such event'
            });
      }
});

app.post('/endgame', function (req, res) {
    let change = req.body;
    console.log(change);
    eventType = change.event;
    addEndGameStats(change, function(err, eventResult) {
        if (err){
            console.log(err);
        }
        else{
            res.send(eventResult);
        }
    });
    res.send({sensorId: id, value: value, measuretime: time});
});

server.listen(PORT, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.info(`Server is running on port ${PORT}.`);
    }
});