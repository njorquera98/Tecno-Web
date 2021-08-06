import { boot } from 'quasar/wrappers'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


console.log("Puede ser pa?");

var firebaseConfig = {
  apiKey: "AIzaSyBK0rQEKCF6kNcOAf-1gNnEx_4dTidCR0U",
  authDomain: "ayudantias-dici.firebaseapp.com",
  projectId: "ayudantias-dici",
  storageBucket: "ayudantias-dici.appspot.com",
  messagingSenderId: "260061711661",
  appId: "1:260061711661:web:4288735d48477f8a1357a4",
  measurementId: "G-JBLVXKJ5YE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export {db, auth};

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
})
