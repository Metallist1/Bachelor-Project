'use strict';
import { addMovementEvent as addMovementEventRepository , addCoreEvent as addCoreEventRepository , addEndGameStats as addEndGameStatsRepository,
    addEvent as addEventRepository} from '../repositories/recording.repository.js'

let addMovementEvent = function(req, res) {
    addMovementEventRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};


let addEvent = function(req, res) {
    addEventRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

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

export {addMovementEvent, addEvent, addCoreEvent, addEndGameStats};
