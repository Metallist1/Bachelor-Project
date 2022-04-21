
'use strict';
import { getAllMatchStats, addCoreEvent as addCoreEventRepository , addEndGameStats as addEndGameStatsRepository , getSkillName , getWeaponName} from '../repositories/topstats.repository.js'

let addCoreEvent = function(req, res) {
    addCoreEventRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};


let addEndGameStats = function(req, res) {
    addEndGameStatsRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
}; 

let getMostCommonSkill = function(req, res) {
    getAllMatchStats(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            var dict = {};
            weapon_info.forEach((value) => {
                value.forEach((values) => {
                    if(value){
                        const core_events = values[1].players;
                        const objectArray = Object.entries(core_events);
                        objectArray.forEach(([keys, values]) => {
                            dict[values.skill_id]  =  1 + (dict[values.skill_id] || 0);
                        });
                    }
                });
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

let getMostPopularMap = function(req, res) {
  /*  getAllMatchStats(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    }); */
    res(null, "Test map");
};

let getMostPopularWeapon = function(req, res) {
   getAllMatchStats(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            var dict = {};
            weapon_info.forEach((value) => {
                value.forEach((values) => {
                    if(value){
                        const core_events = values[1].players;
                        const objectArray = Object.entries(core_events);
                        objectArray.forEach(([keys, values]) => {
                            dict[values.loadout_id]  =  1 + (dict[values.loadout_id] || 0);
                        });
                    }
                });
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
};

let getTotalSteps = function(req, res) {
    getAllMatchStats(req, function(err, match_info) {
        if (err){
            res(err, null);
        }else{
            let steps = 0;
            match_info.forEach((value) => {
                value.forEach((values) => {
                    const movement_events = values[1].movement_events;
                    const objectArray = Object.entries(movement_events);
                    objectArray.forEach(([keys, values]) => {
                        if(values.type === "step"){
                            steps = steps + 1;
                        }
                    });
                });
            });
            res(null, steps);
        }
    });
};

let getBulletsFired = function(req, res) {
    getAllMatchStats(req, function(err, match_info) {
        if (err){
            res(err, null);
        }else{
            let shots = 0;
            match_info.forEach((value) => {
                value.forEach((values) => {
                    const minor_events = values[1].minor_events;
                    const objectArray = Object.entries(minor_events);
                    objectArray.forEach(([keys, values]) => {
                        if(values.type === "shot"){
                            shots = shots + 1;
                        }
                    });
                });
            });
            res(null, shots);
        }
    });
};


export {addCoreEvent,addEndGameStats , getMostCommonSkill , getMostPopularMap,getMostPopularWeapon, getTotalSteps , getBulletsFired};

// Get top players by kills

// Get top map picked (how many matches happen)
// Get top weapon used
// Get top skill used
// Get top steps taken
// Get all bullets fired.
