'use strict';

const initialiseFB = require('firebase/app');
const firebaseConfig = {
    //Firebase config here
};

initialiseFB.initializeApp(firebaseConfig);

module.exports = initialiseFB;