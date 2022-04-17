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
        // socket.emit("all_maps", user);
// socket.emit("all_weapons", user);
// socket.emit("current_player_count", user);
// socket.emit("current_step_count", user);
// socket.emit("current_bullet_count", user);
// socket.emit("general_statistics", user);
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


    socket.on('get_statistics_by_map_id', (mapID) => {
        socket.emit("map_statistics", {  map_id: mapID.id,
            map_name: "Test",
            total_deaths_by_env: "4",
            total_deaths_by_players: "14",
            total_kills: "25",
            popular_loadout: "Weapon",
            popular_skill: "Skiller",
            average_survival_time: "2.20",
            populiarity: "1",
          });
    });

    socket.on('get_statistics_by_weapon_id', (loadoutID) => {
        socket.emit("weapon_statistics", {
            weapon_id: loadoutID.id,
            weapon_name: "Test weapon",
            hit_rate: "2.3",
            total_kills: "25",
            total_deaths: "2",
            populiarity: "-1",
        });

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