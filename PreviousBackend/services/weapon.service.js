'use strict';

const weaponRepository = require('../repositories/weapon.repository');

let addShot = function(req, res) {
    weaponRepository.addShot(req, function(err, user) {
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