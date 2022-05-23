'use strict';

import { database } from "../db/firebaseDB.js";
import { ref, child, get, push, update } from "firebase/database";

let addMovementEvent =  async function(event, result) {
    const postData = {
        direction: event.direction,
        player_id: event.player_id,
        time: event.time,
        type: event.type
    };

    const updates = {};
    updates['/Statistics/' + event.map+'/matches/' + event.match_id + "/movement_events/" + event.id] = postData;
    update(dbRef, updates)
    result(null, postData);
};

/*

OnValue will actually continuesly update. Which means that its perfect to output to server constant data (Such as top data)
const starCountRef = ref(db, 'posts/' + postId + '/starCount');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  updateStarCount(postElement, data);
});

*/
let addCoreEvent =  async function(event, result) {
    const postData = {
        killers_loadout_id: event.killers_loadout_id,
        player_id: event.player_id,
        victim_id: event.victim_id,
        victims_life_end: event.victims_life_end,
        victims_life_start: event.victims_life_start,
        victims_loadout_id: event.victims_loadout_id,
        cause: event.cause
    };
    
    // Get a key for a new Post.
   // const newPostKey = push(child(dbRef, 'Users')).key;
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/Statistics/' + event.map+'/matches/' + event.match_id + "/core_events/" + event.id] = postData;
    update(dbRef, updates)
    result(null, postData);
};

let addEndGameStats =  async function(event, result) {

    // Get a key for a new Post.
   // const newPostKey = push(child(dbRef, 'Users')).key;
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    
    updates['/Statistics/' + event.map+'/matches/' + event.match_id + "/plaers/"] = event.player_final_stats;
    updates['/Statistics/' + event.map+'/matches/' + event.match_id + "/round_end_time/"] = event.time;
    update(dbRef, updates)
    result(null, postData);
};

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


export {addCoreEvent, addEndGameStats, addMovementEvent, addEvent};
