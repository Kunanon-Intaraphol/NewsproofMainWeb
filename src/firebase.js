import firebase from "firebase";

var firebaseApp = firebase.initializeApp({

  apiKey: "AIzaSyCOsi35GUFpJpntDLWD7qIM1ue3E-zvN_E",
  authDomain: "nsc-newsproof-ticta.firebaseapp.com",
  projectId: "nsc-newsproof-ticta",
  storageBucket: "nsc-newsproof-ticta.appspot.com",
  messagingSenderId: "34412984359",
  appId: "1:34412984359:web:83f8d31a673df105b97602",
  measurementId: "G-37B84CMV6R"
  
});

var db = firebaseApp.firestore();

export {db} ;
