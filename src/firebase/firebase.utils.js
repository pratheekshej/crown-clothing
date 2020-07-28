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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) { return; }
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log(`We've got an error :: ${error.message}`);
        }
    }
    return userRef;
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ 'prompt': 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
