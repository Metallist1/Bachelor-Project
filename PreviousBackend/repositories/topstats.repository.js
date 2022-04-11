'use strict';
import { getDatabase, ref, child, get } from "firebase/database";

const database = getDatabase;

let getTopStats =  async function(user, result) {
    const dbRef = ref(database);
    get(child(dbRef, `users`)).then((snapshot) => {
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

module.exports = {
    getTopStats
}