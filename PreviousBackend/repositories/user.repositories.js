'use strict';

import { database } from "../db/firebaseDB.js";
import { ref, child, get } from "firebase/database";

let login =  async function(user, result) {
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


let register =  async function(user, result) {
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

export {login, register};