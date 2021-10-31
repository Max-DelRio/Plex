
// Import the functions from the SDKs 
// import { initializeApp } from './firebase/app';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";

// import { getAuth, signInWithEmailAndPassword } from './firebase/auth';
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js"

// web app's Firebase configuration
import firebaseConfig from "../firebaseConfig.js";
// const firebaseConfig = {
//     apiKey: "AIzaSyBuEr3fsBnIi0TtGkQKNghven49vzcV6CY",
//     authDomain: "plex-inventory-sytem.firebaseapp.com",
//     projectId: "plex-inventory-sytem",
//     storageBucket: "plex-inventory-sytem.appspot.com",
//     messagingSenderId: "858484179975",
//     appId: "1:858484179975:web:df507d461da15a4baf56a2"
// };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();


export {
    app,
    getAuth,
    signInWithEmailAndPassword,
};


