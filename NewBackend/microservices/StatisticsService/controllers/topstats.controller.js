'use strict';

'use strict';
import { getBulletsFired as getBulletsFiredService, getMostPopularMap as getMostPopularMapService,getMostPopularWeapon as getMostPopularWeaponService,
     getTotalSteps as getTotalStepsService , getMostCommonSkill as getMostCommonSkillService} from '../services/topstats.service.js'

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

export {getTopStats};