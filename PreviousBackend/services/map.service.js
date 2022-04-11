'use strict';

const mapRepository = require('../repositories/map.repository');

let addMap = function(req, res) {
    mapRepository.addMap(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

module.exports = {
    addMap
}