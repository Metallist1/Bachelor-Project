import { createRequire } from 'module'
const require = createRequire(import.meta.url);

//Controllers
import { getAllPlayersOnline } from './controllers/user.controller.js'

import { getTopStats } from './controllers/topstats.controller.js'

import { getAllWeapons, getWeaponStatistics } from './controllers/weapons.controller.js'

import { getAllMaps, getMapStatistics } from './controllers/map.controller.js'

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

server.listen(PORT, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.info(`Server is running on port ${PORT}.`);
    }
});

let currentPlayerCount = 0;

//Socket IO
getAllPlayersOnline().subscribe((data) => {
    currentPlayerCount = data.length;
    io.emit("current_player_count", data.length);
});

io.on("connection", function (socket) {

    console.log("Socket : " + socket.id + " has connected");

    socket.emit("current_player_count", currentPlayerCount);
    
    getAllMaps(null, function(err, allMaps) {
        if (err){
            console.log(err);
            socket.emit("get_user_error", err);
        }
        else{
            socket.emit("all_maps", allMaps);
        }
    });

    getAllWeapons(null, function(err, all_weapons) {
        if (err){
            console.log(err);
            socket.emit("get_user_error", err);
        }
        else{
            socket.emit("all_weapons", all_weapons);
        }
    });
    const start = new Date()
    
    getTopStats(null, function(err, general_statistics) {
        if (err){
            console.log(err);
            socket.emit("get_user_error", err);
        }
        else{
            const stop = new Date()
    
            console.log(`Time Taken to execute = ${(stop - start)/1000} seconds`)
            
            socket.emit("general_statistics", general_statistics);
        }
    });

    socket.on('get_statistics_by_map_id', (mapID) => {
        getMapStatistics(mapID.id, function(err, map_stat) {
            if (err){
                console.log(err);
                socket.emit("get_user_error", err);
            }
            else{
                socket.emit("map_statistics", map_stat);
            }
        });
    });

    socket.on('get_statistics_by_weapon_id', (loadoutID) => {
        const start = new Date()
        getWeaponStatistics(loadoutID.id, function(err, weapon_stat) {
            if (err){
                console.log(err);
                socket.emit("get_user_error", err);
            }
            else{
                socket.emit("weapon_statistics", weapon_stat);
                const stop = new Date()
    
                console.log(`Time Taken to execute = ${(stop - start)/1000} seconds`)
            }
        });
    });

    socket.on("disconnect", () => {
        console.log("User : " + socket.id + " has disconnect");
    });

});