'use strict';

import { database } from "../db/firebaseDB.js";
import { ref, child, get } from "firebase/database";

let addMovementEvent =  async function(user, result) {
    const dbRef = ref(database);
    get(child(dbRef, `Users`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            result(null, snapshot.val());
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
            console.error(error);
            result(error, null);
        });
};


let getTopLoadoutByMap =  async function(user, result) {
    const dbRef = ref(database);
    get(child(dbRef, `Users`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            result(null, snapshot.val());
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
            console.error(error);
            result(error, null);
        });
};


let getTopSkillByMap =  async function(user, result) {
    const dbRef = ref(database);
    get(child(dbRef, `Users`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            result(null, snapshot.val());
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
            console.error(error);
            result(error, null);
        });
};


let getAverageMapSurvivalTime =  async function(user, result) {
    const dbRef = ref(database);
    get(child(dbRef, `Users`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            result(null, snapshot.val());
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
            console.error(error);
            result(error, null);
        });
};


let getTotalKillsByMap =  async function(user, result) {
    const dbRef = ref(database);
    get(child(dbRef, `Users`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            result(null, snapshot.val());
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
            console.error(error);
            result(error, null);
        });
};


let getTotalDeathsByMap =  async function(user, result) {
    const dbRef = ref(database);
    get(child(dbRef, `Users`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            result(null, snapshot.val());
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
            console.error(error);
            result(error, null);
        });
};


let getPopuliarityOfMap =  async function(user, result) {
    const dbRef = ref(database);
    get(child(dbRef, `Users`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            result(null, snapshot.val());
        } else {
            console.log("No data available");
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



export {addMovementEvent, getTopLoadoutByMap , getTopSkillByMap , getAverageMapSurvivalTime, getTotalKillsByMap, getTotalDeathsByMap , getPopuliarityOfMap, getAllMaps};