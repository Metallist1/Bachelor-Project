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



export {addMovementEvent, getTopLoadoutByMap , getTopSkillByMap , getAverageMapSurvivalTime, getTotalKillsByMap, getTotalDeathsByMap , getPopuliarityOfMap};