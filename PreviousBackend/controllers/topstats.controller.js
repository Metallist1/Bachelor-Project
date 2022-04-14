'use strict';

'use strict';
import { getBulletsFired as getBulletsFiredService, getMostPopularMap as getMostPopularMapService,getMostPopularWeapon as getMostPopularWeaponService,
getTopPlayers as getTopPlayersService, getTopStats as getTopStatsService, getTotalSteps as getTotalStepsService , addCoreEvent as addCoreEventService,
addEndGameStats as addEndGameStatsService} from '../services/topstats.service.js'

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


let getTopStats = function(req, res) {
    getTopStatsService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTopPlayers = function(req, res) {
    getTopPlayersService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getMostPopularMap = function(req, res) {
    getMostPopularMapService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getMostPopularWeapon = function(req, res) {
    getMostPopularWeaponService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTotalSteps = function(req, res) {
    getTotalStepsService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getBulletsFired = function(req, res) {
    getBulletsFiredService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};


export {addCoreEvent, addEndGameStats, getTopStats , getTopPlayers , getMostPopularMap,getMostPopularWeapon, getTotalSteps , getBulletsFired};