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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) { return; }
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    const collectionRef = firestore.doc('users');
    const collectionSnapShot = await collectionRef.get();
    console.log({ collection: collectionSnapShot.docs.map(doc => doc.data()) });
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollections = collections.docs.map(doc => {
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });
    return transformedCollections.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ 'prompt': 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
