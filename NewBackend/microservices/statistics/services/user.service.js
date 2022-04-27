
'use strict';

import { BehaviorSubject} from "rxjs";

const playerList = new BehaviorSubject([]);


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

export {getAllPlayersOnline, disconnectPlayer , addPlayer};