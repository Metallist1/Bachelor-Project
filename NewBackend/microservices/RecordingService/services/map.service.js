'use strict';
import { addMovementEvent as addMovementEventRepository} from '../repositories/map.repository.js'

let addMovementEvent = function(req, res) {
    addMovementEventRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

export {addMovementEvent};
