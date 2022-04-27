'use strict';

'use strict';
import {addCoreEvent as addCoreEventService, addEndGameStats as addEndGameStatsService} from '../services/topstats.service.js'

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

export {addCoreEvent, addEndGameStats};