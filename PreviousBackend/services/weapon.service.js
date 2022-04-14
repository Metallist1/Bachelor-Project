
'use strict';
import {addEvent as addEventRepository, getAllWeaponStats } from '../repositories/weapon.repository.js'

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
    getAllWeaponStats(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
        //Filter it here
};

let getTotalKillsByID = function(req, res) {
    getAllWeaponStats(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
        //Filter it here
};

let getTotalDeathsByID = function(req, res) {
    getAllWeaponStats(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
        //Filter it here
};

let getPopuliarityByID = function(req, res) {
    getAllWeaponStats(req, function(err, user) {
        if (err){
            res(err, null);
        }else{
            res(null, user);
        }
    });
    //Filter it here
};


export {addEvent , getAverageHitMiss , getTotalKillsByID, getTotalDeathsByID , getPopuliarityByID};

// Get average hit / miss
// Add an event
// Get total kills by weapon id
// Get total deaths by weapon id
// Populiarity of weapon by id
