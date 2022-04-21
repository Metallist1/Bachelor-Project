'use strict';
import { addMovementEvent as addMovementEventRepository,getMapStatistics,
     getAllMaps as getAllMapsRepository, getFullMapStatistics , getSkillName , getWeaponName} from '../repositories/map.repository.js'

let addMovementEvent = function(req, res) {
    addMovementEventRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTopLoadoutByMap = function(req, res) {
    getMapStatistics(req, function(err, map_info) {
        if (err){
            res(err, null);
        }else{
            var dict = {};
            map_info.matches.forEach((value) => {
                if(value){
                    const players = value.players;
                    const objectArray = Object.entries(players);
                    objectArray.forEach(([keys, values]) => {
                        dict[values.loadout_id]  =  1 + (dict[values.loadout_id] || 0);
                    });
                }
            });
                        // Create items array
            var items = Object.keys(dict).map(function(key) {
                return [key, dict[key]];
            });
            
            // Sort the array based on the second element
            items.sort(function(first, second) {
                return second[1] - first[1];
            });
            let weapon_id = -1;
            weapon_id = items[0][0];
            getWeaponName(weapon_id, function(err, weapon) {
                if (err){
                    res(err, null);
                }else{
                    res(null, weapon);
                }
            });
        }
    });
    res(null, "None");
};

let getTopSkillByMap = function(req, res) {
    getMapStatistics(req, function(err, map_info) {
        if (err){
            res(err, null);
        }else{
            var dict = {};
            map_info.matches.forEach((value) => {
                if(value){
                    const players = value.players;
                    const objectArray = Object.entries(players);
                    objectArray.forEach(([keys, values]) => {
                        dict[values.skill_id]  =  1 + (dict[values.skill_id] || 0);
                    });
                }
            });
                        // Create items array
            var items = Object.keys(dict).map(function(key) {
                return [key, dict[key]];
            });
            
            // Sort the array based on the second element
            items.sort(function(first, second) {
                return second[1] - first[1];
            });
            let skill_id = -1;
            skill_id = items[0][0];
            getSkillName(skill_id, function(err, skill) {
                if (err){
                    res(err, null);
                }else{
                    res(null, skill);
                }
            });
        }
    });
};

let getAverageMapSurvivalTime = function(req, res) {
    getMapStatistics(req, function(err, map_stats) {
        if (err){
            res(err, null);
        }else{
            let count = 0;
            let time = 0;
            map_stats.matches.forEach((value) => {
                    if(value){
                        const core_events = value.core_events;
                        const objectArray = Object.entries(core_events);
                        objectArray.forEach(([keys, values]) => {
                            time = time + (values.victims_life_end-values.victims_life_start)
                            count = count + 1;
                        });
                    }
            });
            res(null, time/count);
        }
    });
};

let getTotalKillsByMap = function(req, res) {
    getMapStatistics(req, function(err, map_stats) {
        if (err){
            res(err, null);
        }else{
            let killCount = 0;
            map_stats.matches.forEach((value) => {
                    if(value){
                        const core_events = value.core_events;
                        const objectArray = Object.entries(core_events);
                        objectArray.forEach(([keys, values]) => {
                            killCount = killCount + 1;
                        });
                    }
            });
            res(null, killCount);
        }
    });
};

let getTotalDeathsByMap = function(req, res) {
    getMapStatistics(req, function(err, map_stats) {
        if (err){
            res(err, null);
        }else{
            let deaths = 0;
            let enviromentDeaths = 0;
            map_stats.matches.forEach((value) => {
                    if(value){
                        const core_events = value.core_events;
                        const objectArray = Object.entries(core_events);
                        objectArray.forEach(([keys, values]) => {
                            if(values.cause === "Weapon"){
                                deaths = deaths + 1;
                            }
                            if(values.cause === "Environment"){
                                enviromentDeaths = enviromentDeaths + 1;
                            }
                        });
                    }
            });
            res(null, {
                by_env: enviromentDeaths,
                by_players: deaths,
            });
        }
    });
};

let getPopuliarityOfMap = function(req, res) {
    getFullMapStatistics(req, function(err, map_info) {
        if (err){
            res(err, null);
        }else{
            var dict = {};
            map_info.forEach((value) => {
                dict[value.id]  =  value.matches.length;
            });
                        // Create items array
            var items = Object.keys(dict).map(function(key) {
                return [key, dict[key]];
            });
            
            // Sort the array based on the second element
            items.sort(function(first, second) {
                return second[1] - first[1];
            });
            let position = -1;
            for(var i=0; i<items.length; i++){
                if(items[i][0].toString() === req.toString()){
                    position = i;
                }
            }
            res(null, position+1);
        }
    });
};

let getAllMaps = function(req, res) {
    getAllMapsRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};                                                 

let getMapInfo = function(req, res) {
    getMapStatistics(req, function(err, map_info) {
        if (err){
            res(err, null);
        }else{
            res(null, {
                map_id: map_info.map_id,
                map_name: map_info.map_name,
            });
        }
    });
};

export {addMovementEvent, getTopLoadoutByMap , getTopSkillByMap , getAverageMapSurvivalTime, getTotalKillsByMap, getTotalDeathsByMap , getPopuliarityOfMap, getAllMaps , getMapInfo};
