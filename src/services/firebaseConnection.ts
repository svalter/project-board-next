import firebase from 'firebase/app';
import 'firebase/firestore';

let firebaseConfig = {
    apiKey: "AIzaSyDmKNNwNPtnjDsX8nvOPOtPs1s4us_aSyA",
    authDomain: "board-ce5a8.firebaseapp.com",
    projectId: "board-ce5a8",
    storageBucket: "board-ce5a8.appspot.com",
    messagingSenderId: "155652956044",
    appId: "1:155652956044:web:5cfcd208b47507a9c980a9",
    measurementId: "G-TCPKCG9LEK"
  };
  
  // Initialize Firebase

  if(!firebase.getApps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;
  