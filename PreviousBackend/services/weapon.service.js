
'use strict';
import {addEvent as addEventRepository, getAllWeaponStats , getAllWeapons as getAllWeaponsRepository , getWeaponInfo as getWeaponInfoRepository } from '../repositories/weapon.repository.js'

let addEvent = function(req, res) {
    addEventRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
};

let getAverageHitMiss = function(req, res) {
    getAllWeaponStats(req, function(err, weapon_info) {
        if (err){
            res(err, null);
        }else{
            let shots = 0;
            let hits = 0;
            weapon_info.forEach((value) => {
                value.forEach((values) => {
                    const minor_events = values[1].minor_events;
                    const objectArray = Object.entries(minor_events);
                    objectArray.forEach(([keys, values]) => {
                        if(values.type === "shot" && values.loadout_id.toString() === req.toString()){
                            shots = shots + 1;
                            if(values.result === "hit"){
                                hits = hits + 1;
                            }
                        }
                        
                    });
                });
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
            weapon_info.forEach((value) => {
                value.forEach((values) => {
                    if(value){
                        const core_events = values[1].core_events;
                        const objectArray = Object.entries(core_events);
                        objectArray.forEach(([keys, values]) => {
                            if(values.cause === "Weapon" && values.killers_loadout_id.toString() === req.toString()){
                                killCount = killCount + 1;
                            }
                            
                        });
                    }
                });
            });
            res(null, killCount);
        }
    });
};

let getTotalDeathsByID = function(req, res) {
    getAllWeaponStats(req, function(err, weapon_info) {
        if (err){
            res(err, null);
        }else{
            let killCount = 0;
            weapon_info.forEach((value) => {
                value.forEach((values) => {
                    if(value){
                        const core_events = values[1].core_events;
                        const objectArray = Object.entries(core_events);
                        objectArray.forEach(([keys, values]) => {
                            if(values.cause === "Weapon" && values.victims_loadout_id.toString() === req.toString()){
                                killCount = killCount + 1;
                            }
                            
                        });
                    }
                });
            });
            res(null, killCount);
        }
    });
};

let getPopuliarityByID = function(req, res) {
    getAllWeaponStats(req, function(err, weapon_info) {
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
            let position = -1;
            for(var i=0; i<items.length; i++){
                console.log(items[i][0].toString() , req.toString())
                if(items[i][0].toString() === req.toString()){
                    position = i;
                }
            }
            res(null, position+1);
        }
    });
};

let getAllWeapons = function(req, res) {
    getAllWeaponsRepository(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
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
