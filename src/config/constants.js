import firebase from 'firebase';

var config = {};

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export const googleProvider = new firebase.auth.GoogleAuthProvider();
