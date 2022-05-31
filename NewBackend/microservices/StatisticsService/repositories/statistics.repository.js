'use strict';
import { createRequire } from 'module'
const require = createRequire(import.meta.url);

import { database } from "../db/firebaseDB.js";
import { ref, onValue } from "firebase/database";

const NodeCache = require( "node-cache" );
const myCache = new NodeCache( {  checkperiod: 0 } );

import { Worker } from 'worker_threads';

function runService(workerData) {
    return new Promise((resolve, reject) => {
      const worker = new Worker('./repositories/topstats.worker.js', { workerData });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      })
    })
  }

onValue(ref(database, 'Loadouts/'), (snapshot) => {
    if (snapshot.exists()) {
        let all_weapons = [];
        const objectArray = Object.entries( snapshot.val());

        objectArray.forEach(([key, value]) => {
            all_weapons.push({
                id: key,
                primary_weapon: value.primary_weapon,
                secondary_weapon: value.secondary_weapon,
                granade: value.granade
            });
        });
        myCache.set( "all_weapons", all_weapons, 0 );
    } else {
        console.log("No data available");
    }
});

onValue(ref(database, 'Skills/'), (snapshot) => {
    if (snapshot.exists()) {
        let all_skills = [];
        const objectArray = Object.entries( snapshot.val());
        objectArray.forEach(([key, value]) => {
            all_skills.push({
                id: key,
                skill_damage: value.skill_damage,
                skill_name: value.skill_name
            });
        });
        myCache.set( "all_skills", all_skills, 0 );
    } else {
        console.log("No data available For skills");
    }
});

onValue(ref(database, 'Statistics/'), async (snapshot) => {
    if (snapshot.exists()) {
        let all_stats = [];
        const objectArray = Object.entries( snapshot.val());
        objectArray.forEach(([key, value]) => {
            all_stats.push( {
                id: value.map_id,
                map_name:value.map_name,
                matches: value.matches,
                map_display_name: value.map_name
            });
        });
        myCache.set( "all_stats", all_stats, 0 );
        const result = await runService(all_stats);

        myCache.set( "mostCommonSkillID", result.mostCommonSkillID, 0 );
        myCache.set( "topMap", result.topMap, 0 );
        myCache.set( "topWeaponID", result.topWeaponID, 0 );
        myCache.set( "totalSteps", result.totalSteps, 0 );
        myCache.set( "totalBulletsFired", result.totalBulletsFired, 0 );
    } else {
        console.log("No data available For Statistics");
    }
});

let getSkillName =  async function(skill_id, result) {
    let isFound = null;
    const allSkills = myCache.get( "all_skills" );
    if ( allSkills == undefined ){
        result("No statistics found", null);
    }
    for (let i = 0; i < allSkills.length; i++) {
        if(allSkills[i].id == skill_id){
            isFound = allSkills[i].skill_name;
            break;
        }
    }

    if(!isFound){
        result("No data available skill name", null);
    }else{
        result(null, isFound);
    }
};

let getAllWeapons =  async function(none, result) {
    const value = myCache.get( "all_weapons" );
    if ( value == undefined ){
        result("No Weapons found", null);
    }
    result(null, value);
};


let getWeaponInfo =  async function(id, result) {
    let isFound = null;

    const allWeapons = myCache.get( "all_weapons" );
    if ( allWeapons == undefined ){
        result("No Weapons found", null);
    }

    for (let i = 0; i < allWeapons.length; i++) {
        if(allWeapons[i].id == id){
            isFound = allWeapons[i];
            break;
        }
    }
    if(!isFound){
        result("No data available weapon info", null);
    }else{
        result(null, isFound);
    }
};

let getMapStatistics =  async function(map_id, result) {
    let isFound = null;
    const allStats = myCache.get( "all_stats" );
    if ( allStats == undefined ){
        result("No statistics found", null);
    }
    for (let i = 0; i < allStats.length; i++) {
        if(allStats[i].id.toString() == map_id.toString()){
            isFound = allStats[i];
            break;
        }
    }
    if(!isFound){
        result("No data available map info", null);
    }else{
        result(null, isFound);
    }
};

let getFullMapStatistics =  async function(defaultVariable, result) {
    const value = myCache.get( "all_stats" );
    if ( value == undefined ){
        result("No statistics found", null);
    }
    result(null, value);
};

let getMostCommonSkillID =  async function(defaultVariable, result) {
    const value = myCache.get( "mostCommonSkillID" );
    if ( value == undefined ){
        result("No statistics found", null);
    }
    result(null, value);
};

let getTopMap =  async function(defaultVariable, result) {
    const value = myCache.get( "topMap" );
    if ( value == undefined ){
        result("No statistics found", null);
    }
    result(null, value);
};

let getTopWeaponID =  async function(defaultVariable, result) {
    const value = myCache.get( "topWeaponID" );
    if ( value == undefined ){
        result("No statistics found", null);
    }
    result(null, value);
};

let getTotalSteps =  async function(defaultVariable, result) {
    const value = myCache.get( "totalSteps" );
    if ( value == undefined ){
        result("No statistics found", null);
    }
    result(null, value);
};

let getTotalBulletsFired =  async function(defaultVariable, result) {
    const value = myCache.get( "totalBulletsFired" );
    if ( value == undefined ){
        result("No statistics found", null);
    }
    result(null, value);
};

let getAllMatchStats =  async function(user, result) {
    let isFound = [];
    const allStats = myCache.get( "all_stats" );
    if ( allStats == undefined ){
        result("No statistics found", null);
    }
    for (let i = 0; i < allStats.length; i++) {
        isFound.push( Object.entries(  allStats[i].matches));
    }
    result(null, isFound);
};

export { getAllWeapons, getWeaponInfo, getSkillName, getMapStatistics, getFullMapStatistics, getAllMatchStats, getMostCommonSkillID, getTopMap, getTopWeaponID, getTotalSteps, getTotalBulletsFired };