'use strict';

const weaponService = require('../services/weapon.service');

let addShot = function(req, res) {
    weaponService.addShot(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

module.exports = {
    addShot
}