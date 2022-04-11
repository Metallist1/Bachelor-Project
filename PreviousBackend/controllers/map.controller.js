'use strict';

const mapService = require('../services/map.service');

let addMap = function(req, res) {
    mapService.addMap(req, function(err, user) {
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