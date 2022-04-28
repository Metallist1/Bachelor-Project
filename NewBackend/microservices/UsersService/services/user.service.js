
'use strict';
import { login as repositoryLogin, register as repositoryRegister } from '../repositories/user.repositories.js'

import { BehaviorSubject} from "rxjs";

const playerList = new BehaviorSubject([]);

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
    const existingUser = playerList.value.find(
        (u) => u.socketID === req.socketID,
      );
      if (!existingUser) {
        console.log("User already added")
      } else {
        console.log("New user added to behavior")
      }
      playerList.next([
        ...playerList.value,
        req,
      ]);
};

let disconnectPlayer = function(req, res) {
    playerList.next(
        playerList.value.filter((u) => u.socketID !== req),
      );
};


let getAllPlayersOnline = function() {
    return playerList;
};

export {login , register , getAllPlayersOnline, disconnectPlayer , addPlayer};