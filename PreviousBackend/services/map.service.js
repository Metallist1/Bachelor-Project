'use strict';
import { addMovementEvent as addMovementEventRepository, getAverageMapSurvivalTime as getAverageMapSurvivalTimeRepository, getPopuliarityOfMap as getPopuliarityOfMapRepository,
getTopLoadoutByMap as getTopLoadoutByMapRepository , getTopSkillByMap as getTopSkillByMapRepository , getTotalDeathsByMap as getTotalDeathsByMapRepository, getTotalKillsByMap as getTotalKillsByMapRepository} from '../repositories/map.repository.js'

let addMovementEvent = function(req, res) {
    addMovementEventRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTopLoadoutByMap = function(req, res) {
    getTopLoadoutByMapRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTopSkillByMap = function(req, res) {
    getTopSkillByMapRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getAverageMapSurvivalTime = function(req, res) {
    getAverageMapSurvivalTimeRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTotalKillsByMap = function(req, res) {
    getTotalKillsByMapRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTotalDeathsByMap = function(req, res) {
    getTotalDeathsByMapRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getPopuliarityOfMap = function(req, res) {
    getPopuliarityOfMapRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};


export {addMovementEvent, getTopLoadoutByMap , getTopSkillByMap , getAverageMapSurvivalTime, getTotalKillsByMap, getTotalDeathsByMap , getPopuliarityOfMap};
 //  addEvent,
// Get most popular loadout by map
// Get most popular skill by map.
// Get average survival time

// Get total kills by map id
// Get total deaths by map id
// Populiarity of map id