
'use strict';
import { login as repositoryLogin, register as repositoryRegister } from '../repositories/user.repositories.js'

const playerList = [];

let login = function(req, res) {
    repositoryLogin(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};



let register = function(req, res) {
    repositoryRegister(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let addPlayer = function(req, res) {
    playerList.push(req);
};

let disconnectPlayer = function(req, res) {
    const index = playerList.findIndex(obj => obj.id === req.id);
    const playerList = [
        ...playerList.slice(0, index),
        ...playerList.slice(index + 1)
    ]
};


let getAllPlayersOnline = function(req, res) {
    res(null, playerList);
};

export {login , register , getAllPlayersOnline, disconnectPlayer , addPlayer};