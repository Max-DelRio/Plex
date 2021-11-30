// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuEr3fsBnIi0TtGkQKNghven49vzcV6CY",
  authDomain: "plex-inventory-sytem.firebaseapp.com",
  projectId: "plex-inventory-sytem",
  storageBucket: "plex-inventory-sytem.appspot.com",
  messagingSenderId: "858484179975",
  appId: "1:858484179975:web:df507d461da15a4baf56a2"
};

const auth = firebase.auth();
const db = firebase.firestore();
var count = 1;
var edit;
var row;
var userRole;

window.addEventListener('DOMContentLoaded', (event) => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            const uid = user.uid;
            console.log(uid);
            var docRef = db.collection("Users").doc(uid);
            docRef.get().then((doc) => {
                if(doc.exists){
                    queryDB();
                }
            });
        } else {
          // User not logged in or has just logged out.
        }
    });
});

function queryDB(){
    db.collection("Log").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            console.log(doc.id, " => ", doc.data().log, );
            // Name	ID	Supplier	Thickness	Size	Description	Quantity	Total Price	Est. Delivery Date	Shipping Method	Location
            if('content' in document.createElement('template')) {
                var tbody = document.querySelector("#logT");
                var template = document.querySelector("#logRow");
                var clone = template.content.cloneNode(true);
                var tr = clone.querySelector("tr");
                var td = clone.querySelectorAll("td");
                td[0].textContent = count;
                td[1].textContent = doc.data().log;

                tbody.appendChild(clone);
            }
            count++;
        });        
    });
}
