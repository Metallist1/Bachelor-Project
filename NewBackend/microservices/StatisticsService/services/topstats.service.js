
'use strict';

import { getSkillName , getWeaponInfo , getMostCommonSkillID, getTopMap, getTopWeaponID, getTotalSteps as getTotalStepsRepo , getTotalBulletsFired} from '../repositories/statistics.repository.js'

let getMostCommonSkill = function(req, res) {
    getMostCommonSkillID(req, function(err, skill_id) {
        if (err){
            res(err, null);
        }else{
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
    getTopMap(req, function(err, map_name) {
        if (err){
            res(err, null);
        }else{
            res(null, map_name);
        }
    });
};

let getMostPopularWeapon = function(req, res) {
    getTopWeaponID(req, function(err, weapon_id) {
        if (err){
            res(err, null);
        }else{
            getWeaponInfo(weapon_id, function(err, weapon) {
                if (err){
                    res(err, null);
                }else{
                    res(null, weapon.primary_weapon);
                }
            });
        }
    });
};

let getTotalSteps = function(req, res) {
    getTotalStepsRepo(req, function(err, steps) {
        if (err){
            res(err, null);
        }else{
            res(null, steps);
        }
    });
};

let getBulletsFired = function(req, res) {
    getTotalBulletsFired(req, function(err, shots) {
        if (err){
            res(err, null);
        }else{
            res(null, shots);
        }
    });
};


export {getMostCommonSkill , getMostPopularMap,getMostPopularWeapon, getTotalSteps , getBulletsFired};
