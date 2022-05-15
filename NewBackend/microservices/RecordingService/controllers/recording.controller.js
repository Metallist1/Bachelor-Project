'use strict';
import {addCoreEvent as addCoreEventService, addEndGameStats as addEndGameStatsService, addMovementEvent as addMovementEventService, addEvent as addEventService} from '../services/recording.service.js'

let addCoreEvent = function(req, res) {
    addCoreEventService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let addEndGameStats = function(req, res) {
    addEndGameStatsService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
}; 

let addMovementEvent = function(req, res) {
    addMovementEventService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};


let addMinorEvent = function(req, res) {
    addEventService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};


export {addCoreEvent, addEndGameStats, addMinorEvent ,addMovementEvent};