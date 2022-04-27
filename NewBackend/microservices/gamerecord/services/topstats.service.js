
'use strict';
import { addCoreEvent as addCoreEventRepository , addEndGameStats as addEndGameStatsRepository} from '../repositories/topstats.repository.js'

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


export {addCoreEvent,addEndGameStats};

// Get top players by kills

// Get top map picked (how many matches happen)
// Get top weapon used
// Get top skill used
// Get top steps taken
// Get all bullets fired.
