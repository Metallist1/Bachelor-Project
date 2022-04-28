'use strict';

import { database } from "../db/firebaseDB.js";
import { ref, child, get } from "firebase/database";

let getMapStatistics =  async function(map_id, result) {
        const dbRef = ref(database);
        get(child(dbRef, `Statistics`)).then((snapshot) => {
            if (snapshot.exists()) {
                let specificMap = null;
                const objectArray = Object.entries( snapshot.val());
                objectArray.forEach(([key, value]) => {
                    if(value.map_id.toString() == map_id.toString()){
                        specificMap = value;
                    }
                });
                result(null, specificMap);
            } else {
                console.log("No data available");
                result("No data available", null);
            }
            }).catch((error) => {
                console.error(error);
                result(error, null);
            });
};

let getFullMapStatistics =  async function(map_id, result) {
    const dbRef = ref(database);
    get(child(dbRef, `Statistics`)).then((snapshot) => {
        if (snapshot.exists()) {
            let fullStats = [];
            const objectArray = Object.entries( snapshot.val());

            objectArray.forEach(([key, value]) => {
                fullStats.push( {id: value.map_id, matches: value.matches});
            });
            result(null, fullStats);
        } else {
            console.log("No data available");
            result("No data available", null);
        }
        }).catch((error) => {
            console.error(error);
            result(error, null);
        });
};

let getAllMaps =  async function(user, result) {
    const dbRef = ref(database);
    get(child(dbRef, `Statistics`)).then((snapshot) => {
        if (snapshot.exists()) {
            let all_maps = [];
            const objectArray = Object.entries( snapshot.val());

            objectArray.forEach(([key, value]) => {
                const mapObject = {
                    id: value.map_id,
                    map_name: key,
                    map_display_name: value.map_name,
                };
                all_maps.push(mapObject);
            });
            result(null, all_maps);
        } else {
            console.log("No data available");
            result("No data available", null);
        }
        }).catch((error) => {
            console.error(error);
            result(error, null);
        });
};


let getSkillName =  async function(skill_id, result) {
    const dbRef = ref(database);
    get(child(dbRef, `Skills/` + skill_id)).then((snapshot) => {
        if (snapshot.exists()) {
            result(null, snapshot.val().skill_name);
        } else {
            console.log("No data available");
            result("No data available", null);
        }
        }).catch((error) => {
            console.error(error);
            result(error, null);
        });
};


let getWeaponName =  async function(weapon_id, result) {
    const dbRef = ref(database);
    get(child(dbRef, `Loadouts/` + weapon_id)).then((snapshot) => {
        if (snapshot.exists()) {
            result(null, snapshot.val().primary_weapon);
        } else {
            console.log("No data available");
            result("No data available", null);
        }
        }).catch((error) => {
            console.error(error);
            result(error, null);
        });
};

export { getAllMaps, getMapStatistics , getFullMapStatistics, getWeaponName , getSkillName};