'use strict';
import { addMovementEvent as addMovementEventService, getAverageMapSurvivalTime as getAverageMapSurvivalTimeService, getPopuliarityOfMap as getPopuliarityOfMapService,
    getTopLoadoutByMap as getTopLoadoutByMapService , getTopSkillByMap as getTopSkillByMapService ,
    getTotalDeathsByMap as getTotalDeathsByMapService, getTotalKillsByMap as getTotalKillsByMapService , getAllMaps as getAllMapsService , getMapInfo as getMapInfoService} from '../services/map.service.js'

let addMovementEvent = function(req, res) {
    addMovementEventService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};


let getAllMaps = function(req, res) {
    getAllMapsService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTopLoadoutByMap = function(req, res) {
    getTopLoadoutByMapService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTopSkillByMap = function(req, res) {
    getTopSkillByMapService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getAverageMapSurvivalTime = function(req, res) {
    getAverageMapSurvivalTimeService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTotalKillsByMap = function(req, res) {
    getTotalKillsByMapService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTotalDeathsByMap = function(req, res) {
    getTotalDeathsByMapService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getPopuliarityOfMap = function(req, res) {
    getPopuliarityOfMapService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getMapInfo = function(req, res) {
    getMapInfoService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getMapStatistics = function(req, res) {
    getMapInfoService(req, function(err, mapInfo) {
        if (err){
            res(err, null);
        }else{
            getTotalDeathsByMapService(req, function(err, total_deaths) {
                if (err){
                    res(err, null);
                }else{
                    getTotalKillsByMapService(req, function(err, total_kills) {
                        if (err){
                            res(err, null);
                        }else{
                            getAverageMapSurvivalTimeService(req, function(err, average_survival_time) {
                                if (err){
                                    res(err, null);
                                }else{
                                    getPopuliarityOfMapService(req, function(err, populiarity) {
                                        if (err){
                                            res(err, null);
                                        }else{
                                            getTopLoadoutByMapService(req, function(err, top_loadout) {
                                                if (err){
                                                    res(err, null);
                                                }else{
                                                    getTopSkillByMapService(req, function(err, top_skill) {
                                                        if (err){
                                                            res(err, null);
                                                        }else{
                                                            res(null,{  
                                                                map_id: req,
                                                                map_name: mapInfo.map_name,
                                                                total_deaths_by_env: total_deaths.by_env,
                                                                total_deaths_by_players: total_deaths.by_players,
                                                                total_kills: total_kills,
                                                                popular_loadout: top_loadout,
                                                                popular_skill: top_skill,
                                                                average_survival_time: average_survival_time,
                                                                populiarity: populiarity,
                                                            });  
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

export {addMovementEvent, getTopLoadoutByMap , getTopSkillByMap , getAverageMapSurvivalTime, getTotalKillsByMap, getTotalDeathsByMap , getPopuliarityOfMap, getAllMaps, getMapStatistics , getMapInfo};