import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCkPD8gHbmZzfYxC_VZg5D7xX0un4ZCUO4",
  authDomain: "instagram-clone-baae7.firebaseapp.com",
  projectId: "instagram-clone-baae7",
  storageBucket: "instagram-clone-baae7.appspot.com",
  messagingSenderId: "576185380833",
  appId: "1:576185380833:web:b32b52876ae62f7b812ca0",
  measurementId: "G-LL7ET4X2S6",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
