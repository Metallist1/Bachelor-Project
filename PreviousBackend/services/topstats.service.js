
'use strict';
import { getBulletsFired as getBulletsFiredRepository, getMostPopularMap as getMostPopularMapRepository,getMostPopularWeapon as getMostPopularWeaponRepository,
getTopPlayers as getTopPlayersRepository, getTopStats as getTopStatsRepository, getTotalSteps as getTotalStepsRepository,
addCoreEvent as addCoreEventRepository , addEndGameStats as addEndGameStatsRepository} from '../repositories/topstats.repository.js'

let addCoreEvent = function(req, res) {
    addCoreEventRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};


let addEndGameStats = function(req, res) {
    addEndGameStatsRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
}; 

let getTopStats = function(req, res) {
    getTopStatsRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTopPlayers = function(req, res) {
    getTopPlayersRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getMostPopularMap = function(req, res) {
    getMostPopularMapRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getMostPopularWeapon = function(req, res) {
    getMostPopularWeaponRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTotalSteps = function(req, res) {
    getTotalStepsRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getBulletsFired = function(req, res) {
    getBulletsFiredRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};


export {addCoreEvent,addEndGameStats, getTopStats , getTopPlayers , getMostPopularMap,getMostPopularWeapon, getTotalSteps , getBulletsFired};

// Get top players by kills

// Get top map picked (how many matches happen)
// Get top weapon used
// Get top skill used
// Get top steps taken
// Get all bullets fired.
