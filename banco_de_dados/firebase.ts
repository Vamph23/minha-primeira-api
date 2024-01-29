// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firestore from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPgtWtg4ow2NSXoxdFjYnDJ2SGIMvP3FQ",
  authDomain: "teste-3dd00.firebaseapp.com",
  projectId: "teste-3dd00",
  storageBucket: "teste-3dd00.appspot.com",
  messagingSenderId: "315753172184",
  appId: "1:315753172184:web:6896503f117942e63e9bad",
  measurementId: "G-SWJ5T56HP5"
};

// Initialize Firebase
console.log("Conectado ao Firebase!");
const Firebase = initializeApp(firebaseConfig);
export const db = firestore.getFirestore(Firebase);

export { firestore };
