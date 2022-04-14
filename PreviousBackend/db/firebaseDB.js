'use strict';

import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOYotoYdCz52HY_wbYGod72WPsceYQ7ng",
    authDomain: "bachelor-project-3edad.firebaseapp.com",
    databaseURL: "https://bachelor-project-3edad-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bachelor-project-3edad",
    storageBucket: "bachelor-project-3edad.appspot.com",
    messagingSenderId: "251865760597",
    appId: "1:251865760597:web:ea19a6b64664dc6cd3a5dc"
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);


export {database};