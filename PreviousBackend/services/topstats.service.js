'use strict';

const topStatsRepository = require('../repositories/topstats.repository');

let getTopStats = function(req, res) {
    topStatsRepository.getTopStats(req, function(err, user) {
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