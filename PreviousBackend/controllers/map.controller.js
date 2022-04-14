'use strict';
import { addMovementEvent as addMovementEventService, getAverageMapSurvivalTime as getAverageMapSurvivalTimeService, getPopuliarityOfMap as getPopuliarityOfMapService,
    getTopLoadoutByMap as getTopLoadoutByMapService , getTopSkillByMap as getTopSkillByMapService ,
    getTotalDeathsByMap as getTotalDeathsByMapService, getTotalKillsByMap as getTotalKillsByMapService} from '../services/map.service.js'

let addMovementEvent = function(req, res) {
    addMovementEventService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTopLoadoutByMap = function(req, res) {
    getTopLoadoutByMapService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTopSkillByMap = function(req, res) {
    getTopSkillByMapService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getAverageMapSurvivalTime = function(req, res) {
    getAverageMapSurvivalTimeService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTotalKillsByMap = function(req, res) {
    getTotalKillsByMapService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTotalDeathsByMap = function(req, res) {
    getTotalDeathsByMapService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getPopuliarityOfMap = function(req, res) {
    getPopuliarityOfMapService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};


export {addMovementEvent, getTopLoadoutByMap , getTopSkillByMap , getAverageMapSurvivalTime, getTotalKillsByMap, getTotalDeathsByMap , getPopuliarityOfMap};