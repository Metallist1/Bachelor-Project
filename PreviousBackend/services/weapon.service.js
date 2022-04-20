
'use strict';
import {addEvent as addEventRepository, getAllWeaponStats , getAllWeapons as getAllWeaponsRepository , getWeaponInfo as getWeaponInfoRepository } from '../repositories/weapon.repository.js'

let addEvent = function(req, res) {
  /*  getAllWeaponStats(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });*/
    res(null, "0");
};

let getAverageHitMiss = function(req, res) {
    getAllWeaponStats(req, function(err, weapon_info) {
        if (err){
            res(err, null);
        }else{
            let shots = 0;
            let hits = 0;
            weapon_info.forEach(([key, value]) => {
                if(value){
                    const minor_events = value[1].minor_events;
                    const objectArray = Object.entries(minor_events);
                    objectArray.forEach(([keys, values]) => {
                        if(values.type === "shot" && values.loadout_id.toString() === req.toString()){
                            shots = shots + 1;
                            if(values.result === "hit"){
                                hits = hits + 1;
                            }
                        }
                        
                    });
                }
            });
            res(null, hits/shots);
        }
    });
};

let getTotalKillsByID = function(req, res) {
    getAllWeaponStats(req, function(err, weapon_info) {
        if (err){
            res(err, null);
        }else{
            let killCount = 0;
            weapon_info.forEach(([key, value]) => {
                if(value){
                    const core_events = value[1].core_events;
                    const objectArray = Object.entries(core_events);
                    objectArray.forEach(([keys, values]) => {
                        if(values.cause === "Weapon" && values.loadout_id.toString() === req.toString()){
                            killCount = killCount + 1;
                        }
                        
                    });
                }
            });
            res(null, killCount);
        }
    });
};

let getTotalDeathsByID = function(req, res) {
  /*  getAllWeaponStats(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });*/
    res(null, "0");
        //Filter it here
};

let getPopuliarityByID = function(req, res) {
  /*  getAllWeaponStats(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });*/
    res(null, "0");
    //Filter it here
};

let getAllWeapons = function(req, res) {
    getAllWeaponsRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
    //Filter it here
};

let getWeaponInfo = function(req, res) {
    getWeaponInfoRepository(req, function(err, weapon_info) {
        if (err){
            res(err, null);
        }else{
            res(null, weapon_info);
        }
    });
    //Filter it here
};
export {addEvent , getAverageHitMiss , getTotalKillsByID, getTotalDeathsByID , getPopuliarityByID, getAllWeapons, getWeaponInfo};

// Get average hit / miss
// Add an event
// Get total kills by weapon id
// Get total deaths by weapon id
// Populiarity of weapon by id
