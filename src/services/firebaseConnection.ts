

import firebase from 'firebase/compat/app';
import 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage'

let firebaseConfig = {
    apiKey: process.env.NEXT_APP_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_APP_FIREBASE_PROJETCTID,
    storageBucket: process.env.NEXT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.NEXT_APP_FIREBASE_APPID,
    measurementId: process.env.NEXT_APP_FIREBASE_MEASEREMENTID,
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export default firebase;
