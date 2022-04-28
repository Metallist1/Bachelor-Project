
'use strict';
import {addEvent as addEventService } from '../services/weapon.service.js'

let addMinorEvent = function(req, res) {
    addEventService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};


export {addMinorEvent};