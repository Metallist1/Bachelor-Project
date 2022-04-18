'use strict';

import { database } from "../db/firebaseDB.js";
import { ref, child, get, push, update } from "firebase/database";

//This could be upgraded with quaries. Filter on username.
//Or use the excuse that this will be filtered on UID. Your choice.
let login =  async function(user, result) {
    const dbRef = ref(database);
    get(child(dbRef, `Users`)).then((snapshot) => {
        if (snapshot.exists()) {
            let userToFind = null;
            const objectArray = Object.entries( snapshot.val());

            objectArray.forEach(([key, value]) => {
                if(value.username === user.username && value.password === user.password){
                    userToFind = value;
                }
            });
            result(null, userToFind);
        } else {
            console.log("No data available");
            result("No data available", null);
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
            let userToFind = null;
            const objectArray = Object.entries( snapshot.val());
              
            objectArray.forEach(([key, value]) => {
                if(value.username === user.username && value.password === user.password){
                    userToFind = value;
                }
            });
            if(userToFind === null){
                // Example:
                // A post entry.
                const newPostKey = between(700000000, 800000000);

                const postData = {
                    username: user.username,
                    uid: newPostKey,
                    password: user.password
                };
                // Get a key for a new Post.
               // const newPostKey = push(child(dbRef, 'Users')).key;
                // Write the new post's data simultaneously in the posts list and the user's post list.
                const updates = {};
                updates['/Users/' + newPostKey] = postData;
                update(dbRef, updates)
                result(null, postData);

            }else{
                result("There is such user", null);
            }
        } else {
            console.log("No data available");
            result("No data available", null);
        }
        }).catch((error) => {
            console.error(error);
            result(error, null);
        });
};

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }
  

export {login, register};