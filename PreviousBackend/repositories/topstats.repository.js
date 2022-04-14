'use strict';

import { database } from "../db/firebaseDB.js";
import { ref, child, get } from "firebase/database";

let addCoreEvent =  async function(user, result) {
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

let addEndGameStats =  async function(user, result) {
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

let getTopStats =  async function(user, result) {
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


let getTopPlayers =  async function(user, result) {
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


let getMostPopularMap =  async function(user, result) {
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


let getMostPopularWeapon =  async function(user, result) {
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


let getTotalSteps =  async function(user, result) {
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


let getBulletsFired =  async function(user, result) {
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


export {addCoreEvent, addEndGameStats, getTopStats , getTopPlayers , getMostPopularMap,getMostPopularWeapon, getTotalSteps , getBulletsFired};