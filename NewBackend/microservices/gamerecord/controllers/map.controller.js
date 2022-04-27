'use strict';
import { addMovementEvent as addMovementEventService} from '../services/map.service.js'

let addMovementEvent = function(req, res) {
    addMovementEventService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

export {addMovementEvent};