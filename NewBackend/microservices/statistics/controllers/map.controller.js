'use strict';
import { getAverageMapSurvivalTime as getAverageMapSurvivalTimeService, getPopuliarityOfMap as getPopuliarityOfMapService,
    getTopLoadoutByMap as getTopLoadoutByMapService , getTopSkillByMap as getTopSkillByMapService ,
    getTotalDeathsByMap as getTotalDeathsByMapService, getTotalKillsByMap as getTotalKillsByMapService , getAllMaps as getAllMapsService , getMapInfo as getMapInfoService} from '../services/map.service.js'

let getAllMaps = function(req, res) {
    getAllMapsService(req, function(err, user) {
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

export { getAllMaps, getMapStatistics};