
'use strict';
import {addEvent as addEventRepository} from '../repositories/weapon.repository.js'

let addEvent = function(req, res) {
    addEventRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

export {addEvent};
