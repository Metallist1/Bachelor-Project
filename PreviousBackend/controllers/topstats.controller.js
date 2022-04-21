'use strict';

'use strict';
import { getBulletsFired as getBulletsFiredService, getMostPopularMap as getMostPopularMapService,getMostPopularWeapon as getMostPopularWeaponService,
     getTotalSteps as getTotalStepsService , addCoreEvent as addCoreEventService,
addEndGameStats as addEndGameStatsService, getMostCommonSkill as getMostCommonSkillService} from '../services/topstats.service.js'

let addCoreEvent = function(req, res) {
    addCoreEventService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let addEndGameStats = function(req, res) {
    addEndGameStatsService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
}; 

let getMostCommonSkill = function(req, res) {
    getMostCommonSkillService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getMostPopularMap = function(req, res) {
    getMostPopularMapService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getMostPopularWeapon = function(req, res) {
    getMostPopularWeaponService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getTotalSteps = function(req, res) {
    getTotalStepsService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getBulletsFired = function(req, res) {
    getBulletsFiredService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};


let getTopStats = function(req, res) {
    getBulletsFiredService(req, function(err, bullets_fired) {
        if (err){
            res(err, null);
        }else{
            getMostPopularMapService(req, function(err, most_popular_map) {
                if (err){
                    res(err, null);
                }else{
                    getTotalStepsService(req, function(err, total_steps) {
                        if (err){
                            res(err, null);
                        }else{
                            getMostCommonSkillService(req, function(err, most_common_skill) {
                                if (err){
                                    res(err, null);
                                }else{
                                    getMostPopularWeaponService(req, function(err, most_popular_loadout) {
                                        if (err){
                                            res(err, null);
                                        }else{
                                            res(null, {
                                                current_step_count: total_steps,
                                                current_bullet_count: bullets_fired,
                                                most_common_skill: most_common_skill,
                                                most_user_loadout: most_popular_loadout,
                                                favorite_map: most_popular_map,
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

export {addCoreEvent, addEndGameStats, getTopStats , getMostPopularMap,getMostPopularWeapon, getTotalSteps , getBulletsFired, getMostCommonSkill};