import { workerData, parentPort } from 'worker_threads'


let match_info = [];

for (let i = 0; i < workerData.length; i++) {
    match_info.push( Object.entries(  workerData[i].matches));
}

let getMostCommonSkill = function(match_info) {
    console.log(match_info);
    var dict = {};
    match_info.forEach((value) => {
        value.forEach((values) => {
            if(value){
                const core_events = values[1].players;
                const objectArray = Object.entries(core_events);
                objectArray.forEach(([keys, values]) => {
                    dict[values.skill_id]  =  1 + (dict[values.skill_id] || 0);
                });
            }
        });
    });
    // Create items array
    var items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
    });
            
    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    let skill_id = -1;
    skill_id = items[0][0];
    return skill_id;
};

let getMostPopularMap = function(map_info) {
    var dict = {};
    map_info.forEach((value) => {
        dict[value.id]  =  value.matches.length;
    });
    // Create items array
    var items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
    });
            
    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    let top_map = -1;
    top_map = items[0][0];
    let map_name = "none";
    map_info.forEach((value) => {
        if(value.id == top_map){
            map_name = value.map_display_name;
        }
    });
    return map_name;   
};

let getMostPopularWeapon = function(match_info) {
    var dict = {};
    match_info.forEach((value) => {
        value.forEach((values) => {
            if(value){
                const core_events = values[1].players;
                const objectArray = Object.entries(core_events);
                objectArray.forEach(([keys, values]) => {
                    dict[values.loadout_id]  =  1 + (dict[values.loadout_id] || 0);
                });
            }
        });
    });
    // Create items array
    var items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
    });
            
    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    let weapon_id = -1;
    weapon_id = items[0][0];
    return weapon_id;
};

let getTotalSteps = function(match_info) {
    let steps = 0;
    match_info.forEach((value) => {
        value.forEach((values) => {
            const movement_events = values[1].movement_events;
            const objectArray = Object.entries(movement_events);
            objectArray.forEach(([keys, values]) => {
                if(values.type === "step"){
                    steps = steps + 1;
                }
            });
        });
    });
    return steps;
};

let getBulletsFired = function(match_info) {
    let shots = 0;
    match_info.forEach((value) => {
        value.forEach((values) => {
            const minor_events = values[1].minor_events;
            const objectArray = Object.entries(minor_events);
            objectArray.forEach(([keys, values]) => {
                if(values.type === "shot"){
                    shots = shots + 1;
                }
            });
        });
    });
    return shots;
};



parentPort.postMessage({ mostCommonSkillID: getMostCommonSkill(match_info), topMap: getMostPopularMap(workerData),
    topWeaponID: getMostPopularWeapon(match_info), totalSteps: getTotalSteps(match_info),totalBulletsFired: getBulletsFired(match_info) })