
'use strict';
import {getAverageHitMiss as getAverageHitMissService,
     getPopuliarityByID as getPopuliarityByIDService,getTotalDeathsByID as getTotalDeathsByIDService,
     getTotalKillsByID as getTotalKillsByIDService, getAllWeapons as getAllWeaponsService ,getWeaponInfo as getWeaponInfoService } from '../services/weapon.service.js'

let getAllWeapons = function(req, res) {
    getAllWeaponsService(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getWeaponStatistics = function(req, res) {
    getWeaponInfoService(req, function(err, weaponInfo) {
        if (err){
            res(err, null);
        }else{
            getAverageHitMissService(req, function(err, hit_rate) {
                if (err){
                    res(err, null);
                }else{
                    getTotalKillsByIDService(req, function(err, total_kills) {
                        if (err){
                            res(err, null);
                        }else{
                            getTotalDeathsByIDService(req, function(err, total_deaths) {
                                if (err){
                                    res(err, null);
                                }else{
                                    getPopuliarityByIDService(req, function(err, populiarity) {
                                        if (err){
                                            res(err, null);
                                        }else{
                                            res(null, {
                                                weapon_id: weaponInfo.id,
                                                weapon_name: weaponInfo.primary_weapon,
                                                hit_rate: hit_rate,
                                                total_kills: total_kills,
                                                total_deaths: total_deaths,
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
};

export { getAllWeapons ,  getWeaponStatistics};