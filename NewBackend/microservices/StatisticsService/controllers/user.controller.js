'use strict';
import { addPlayer as serviceAddPlayer, disconnectPlayer as serviceDisconnect, getAllPlayersOnline as getAllPlayers } from '../services/user.service.js'

import { listenForMessages } from '../services/rabbitmqHelper.js'

async function HandleUserDisconnect(message) {
    serviceDisconnect(message, function(err, user) {
        if (err){
            res(err, null);
        }
    });
}

async function HandleUserConnected(message) {
    serviceAddPlayer(message, function(err, user) {
        if (err){
            res(err, null);
        }
    });
}

let getAllPlayersOnline = function() {
    return getAllPlayers();
};

// consume messages from RabbitMQ
const consume = function consume({ connection, channel, resultsChannel }) {
    return new Promise((resolve, reject) => {
        channel.consume("users.connected", async function (msg) {
            // parse message
            let msgBody = msg.content.toString();
            let data = JSON.parse(msgBody);
  
            // process data
            HandleUserConnected(data);
  
            // acknowledge message as processed successfully
            await channel.ack(msg);
        });
  
        channel.consume("users.disconnected", async function (msg) {
            // parse message
            let msgBody = msg.content.toString();
            let data = JSON.parse(msgBody);
            console.log(data);
            // process data
            HandleUserDisconnect(data);
  
            // acknowledge message as processed successfully
            await channel.ack(msg);
        });
  
        // handle connection closed
        connection.on("close", (err) => {
            return reject(err);
        });
  
        // handle errors
        connection.on("error", (err) => {
            return reject(err);
        });
    });
  }

listenForMessages(consume);

export { getAllPlayersOnline};
