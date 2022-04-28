'use strict';

import { connection } from "../db/mysqlDB.js";

//This could be upgraded with quaries. Filter on username.
//Or use the excuse that this will be filtered on UID. Your choice.
let login =  async function(user, result) {
    connection.execute(
        'SELECT * FROM `user` WHERE `Username` = ? AND `Password` = ?',
        [user.username, user.password],
        function(err, results, fields) {
            if(err){
                console.log(err);
                result("No data available", null);
            }else{
                result(null, results[0]);
            }
        }
      );
};


let register =  async function(user, result) {

    const newPostKey = between(700000000, 800000000);

    connection.execute(
        'INSERT INTO user (uid, Username, Password) VALUES (?, ?, ?)',
        [newPostKey, user.username, user.password],
        function(err, results, fields) {
            if(err){
                console.log(err);
                result("No data available", null);
            }else{
                result(null,{
                    id: results.insertId,
                    username: user.username,
                    uid: newPostKey,
                    password: user.password
                });
            }
        }
      );
};

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }
  

export {login, register};