'use strict';

import { database } from "../db/firebaseDB.js";
import { ref, child, get, onValue } from "firebase/database";


let allWeapons = [];
let allSkills = [];
let allStats = [];


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
        allWeapons = all_weapons;
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
        allSkills = all_skills;
    } else {
        console.log("No data available For skills");
    }
});

onValue(ref(database, 'Statistics/'), (snapshot) => {
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
        allStats = all_stats;
    } else {
        console.log("No data available For Statistics");
    }
});

let getSkillName =  async function(skill_id, result) {
    let isFound = null;
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

let getAllWeapons =  async function(user, result) {
    result(null, allWeapons);
};


let getWeaponInfo =  async function(id, result) {
    let isFound = null;
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
    for (let i = 0; i < allStats.length; i++) {
        if(allStats[i].id.toString() == map_id.toString()){
            isFound = allStats[i];
            break;
        }
    }
    if(!isFound){
        result("No data available weapon info", null);
    }else{
        result(null, isFound);
    }
};

let getFullMapStatistics =  async function(map_id, result) {
    result(null, allStats);
};

let getAllMatchStats =  async function(user, result) {
    let isFound = [];
    for (let i = 0; i < allStats.length; i++) {
        isFound.push( Object.entries(  allStats[i].matches));
    }
    result(null, isFound);
};

export { getAllWeapons, getWeaponInfo , getSkillName, getMapStatistics, getFullMapStatistics, getAllMatchStats};