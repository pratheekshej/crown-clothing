import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAnSBKVavFxrmd2zDJlTG7dkvkM-244Dmk",
    authDomain: "crown-db-7f54e.firebaseapp.com",
    databaseURL: "https://crown-db-7f54e.firebaseio.com",
    projectId: "crown-db-7f54e",
    storageBucket: "crown-db-7f54e.appspot.com",
    messagingSenderId: "714874771515",
    appId: "1:714874771515:web:246a54cb20db126e08241e",
    measurementId: "G-M3RWGMX76C"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ 'prompt': 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
