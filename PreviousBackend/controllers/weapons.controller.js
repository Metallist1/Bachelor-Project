
'use strict';
import {addEvent as addEventService, getAverageHitMiss as getAverageHitMissService,
     getPopuliarityByID as getPopuliarityByIDService,getTotalDeathsByID as getTotalDeathsByIDService,
     getTotalKillsByID as getTotalKillsByIDService } from '../services/weapon.service.js'

let addMinorEvent = function(req, res) {
    addEventService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getAverageHitMiss = function(req, res) {
    getAverageHitMissService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTotalKillsByID = function(req, res) {
    getTotalKillsByIDService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
        //Filter it here
};

let getTotalDeathsByID = function(req, res) {
    getTotalDeathsByIDService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
        //Filter it here
};

let getPopuliarityByID = function(req, res) {
    getPopuliarityByIDService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};


export {addMinorEvent , getAverageHitMiss , getTotalKillsByID, getTotalDeathsByID , getPopuliarityByID};