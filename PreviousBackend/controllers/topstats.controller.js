'use strict';

const topStatsService = require('../services/topstats.service');

let getTopStats = function(req, res) {
    topStatsService.getTopStats(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

module.exports = {
    getTopStats
}