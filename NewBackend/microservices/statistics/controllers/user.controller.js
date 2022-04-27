'use strict';
import { addPlayer as serviceAddPlayer, disconnectPlayer as serviceDisconnect, getAllPlayersOnline as getAllPlayers } from '../services/user.service.js'

let addPlayer = function(req, res) {
    serviceAddPlayer(req, function(err, user) {
        if (err){
            res(err, null);
        }
    });
};

let disconnectPlayer = function(req, res) {
    serviceDisconnect(req, function(err, user) {
        if (err){
            res(err, null);
        }
    });

};

let getAllPlayersOnline = function() {
    return getAllPlayers();
};

export { getAllPlayersOnline, disconnectPlayer , addPlayer};
