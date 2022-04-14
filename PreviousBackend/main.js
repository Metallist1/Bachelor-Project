import { createRequire } from 'module'
const require = createRequire(import.meta.url);

//Controllers
import { login, addPlayer, disconnectPlayer,getAllPlayersOnline,register } from './controllers/user.controller.js'

import { addCoreEvent, addEndGameStats, getBulletsFired, getMostPopularMap, getMostPopularWeapon, getTopPlayers, getTopStats, getTotalSteps } from './controllers/topstats.controller.js'

import { addMinorEvent, getAverageHitMiss, getPopuliarityByID , getTotalDeathsByID, getTotalKillsByID } from './controllers/weapons.controller.js'

import { addMovementEvent, getAverageMapSurvivalTime, getPopuliarityOfMap, getTopLoadoutByMap ,getTopSkillByMap ,getTotalDeathsByMap, getTotalKillsByMap } from './controllers/map.controller.js'

// Express

const app = require('express')();
const bodyParser = require('body-parser');

const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
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

//Socket IO

io.on("connection", function (socket) {
    console.log("Socket : " + socket.id + " has connected");
        // socket.emit("all_test", user);

    socket.on('login', (message) => {
        login(message, function(err, user) {
            if (err){
                console.log(err);
                socket.emit("get_user_error", err);
            }
            else{
                addPlayer(user, function(err) {
                    if (err){
                        console.log(err);
                    }
                    else{
                        io.emit("all_users", getAllPlayersOnline());
                    }
                });
                socket.emit("logged_in", user);
            }
        });
    });

    socket.on('register', (message) => {
        register(message, function(err, user) {
            if (err){
                console.log(err);
                socket.emit("get_user_error", err);
            }
            else{
                addPlayer(user, function(err) {
                    if (err){
                        console.log(err);
                    }
                    else{
                        io.emit("all_users", getAllPlayersOnline());
                    }
                });
                socket.emit("registed_user", user);
            }
        });
    });

    socket.on('get_data_by_player_id', (playerID) => {
        // top kills. Top loadouts. Top maps.
    });

    socket.on('get_data_by_type', (eventType) => {
        //Return a list of specific events. Such as "hits" , "miss". This is used for weapon data
    });

    socket.on('get_data_by_map_type', (mapID) => {
        // Hit / miss / how many steps / most popular loadout / most popular skill
    });

    socket.on('get_data_by_loadout', (loadoutID) => {
        // Average KD / Accuracy / Populiarity

    });

    socket.on("disconnect", () => {
        disconnectPlayer(socket.id, function(err, allUsers) {
            if (err){
                console.log(err);
            }
            else{
                io.emit("all_users", allUsers);
            }
        });
        console.log("User : " + socket.id + " has disconnect");
    });

  });