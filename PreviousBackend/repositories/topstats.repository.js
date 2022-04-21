'use strict';

import { database } from "../db/firebaseDB.js";
import { ref, child, get } from "firebase/database";
/*

OnValue will actually continuesly update. Which means that its perfect to output to server constant data (Such as top data)
const starCountRef = ref(db, 'posts/' + postId + '/starCount');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  updateStarCount(postElement, data);
});

*/
let addCoreEvent =  async function(user, result) {
    console.log
    const dbRef = ref(database);
    get(child(dbRef, `Users`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            snapshot.val().forEach(element => {
                console.log(element);
            });
           // result(null, snapshot.val());
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

let getAllMatchStats =  async function(user, result) {
    const dbRef = ref(database);
        get(child(dbRef, `Statistics`)).then((snapshot) => {
        if (snapshot.exists()) {
            let matches = [];
            const objectArray = Object.entries( snapshot.val());
    
            objectArray.forEach(([key, value]) => {
                matches.push( Object.entries( value.matches));
            });
            result(null, matches);
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

export {addCoreEvent, addEndGameStats, getAllMatchStats,  getWeaponName , getSkillName};