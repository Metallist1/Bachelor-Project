'use strict';
import { login as serviceLogin, addPlayer as serviceAddPlayer, register as serviceRegister,
     disconnectPlayer as serviceDisconnect, getAllPlayersOnline as getAllPlayers } from '../services/user.service.js'

let login = function(req, res) {
    serviceLogin(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let register = function(req, res) {
    serviceRegister(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

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

export {login , register , getAllPlayersOnline, disconnectPlayer , addPlayer};
