'use strict';

import { database } from "../db/firebaseDB.js";
import { ref, child, get, push, update } from "firebase/database";

let addEvent =  async function(event, result) {
    const postData = {
        loadout_id: event.direction,
        player_id: event.player_id,
        time: event.time,
        type: event.type,
        result: event.result
    };
    
    // Get a key for a new Post.
   // const newPostKey = push(child(dbRef, 'Users')).key;
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/Statistics/' + event.map+'/matches/' + event.match_id + "/minor_events/" + event.id] = postData;
    update(dbRef, updates)
    result(null, postData);
};

export {addEvent};