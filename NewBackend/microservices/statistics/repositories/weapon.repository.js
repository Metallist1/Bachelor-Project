'use strict';

import { database } from "../db/firebaseDB.js";
import { ref, child, get } from "firebase/database";

let getAllWeaponStats =  async function(user, result) {
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


let getAllWeapons =  async function(user, result) {
    const dbRef = ref(database);
    get(child(dbRef, `Loadouts`)).then((snapshot) => {
        if (snapshot.exists()) {
            let all_weapons = [];
            const objectArray = Object.entries( snapshot.val());

            objectArray.forEach(([key, value]) => {
                const weaponObject = {
                    id: key,
                    primary_weapon: value.primary_weapon,
                    secondary_weapon: value.secondary_weapon,
                    granade: value.granade
                };
                all_weapons.push(weaponObject);
            });
            result(null, all_weapons);
        } else {
            console.log("No data available");
            result("No data available", null);
        }
        }).catch((error) => {
            console.error(error);
            result(error, null);
        });
};


let getWeaponInfo =  async function(id, result) {
    const dbRef = ref(database);
    get(child(dbRef, `Loadouts/` + id)).then((snapshot) => {
        if (snapshot.exists()) {
                const weaponObject = {
                    id: id,
                    primary_weapon: snapshot.val().primary_weapon,
                    secondary_weapon: snapshot.val().secondary_weapon,
                    granade: snapshot.val().granade
                };
            result(null, weaponObject);
        } else {
            console.log("No data available");
            result("No data available", null);
        }
        }).catch((error) => {
            console.error(error);
            result(error, null);
        });
};
export { getAllWeaponStats, getAllWeapons, getWeaponInfo};