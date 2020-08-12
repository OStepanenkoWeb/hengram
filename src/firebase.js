import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDGKmEL1wQUcNRyxog9rQztmyVRr4txz4E",
    authDomain: "hengram-943e2.firebaseapp.com",
    databaseURL: "https://hengram-943e2.firebaseio.com",
    projectId: "hengram-943e2",
    storageBucket: "hengram-943e2.appspot.com",
    messagingSenderId: "1893186968",
    appId: "1:1893186968:web:02c2e6d281cb800f327fed"
};

const db = firebase.initializeApp(firebaseConfig).firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
