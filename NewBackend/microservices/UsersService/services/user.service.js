
'use strict';
import { login as repositoryLogin, register as repositoryRegister } from '../repositories/user.repositories.js'

import { publishToChannel } from './rabbitmqHelper.js'

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
    publishToChannel( { routingKey: "connected", exchangeName: "users", data: req });
};

let disconnectPlayer = function(req, res) {
    publishToChannel( { routingKey: "disconnected", exchangeName: "users", data: req.toString() });
};



export {login , register , disconnectPlayer , addPlayer};