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
    db.collection("Materials").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            console.log(doc.id, " => ", doc.data().name, doc.data().id, doc.data().supplier,  doc.data().thickness,  doc.data().size, doc.data().description, doc.data().quantity, doc.data().totalprice, doc.data().estimated, doc.data().shipping, doc.data().location);

            if('content' in document.createElement('template')) {
                if(doc.data().quantity == 0) {
                    var tbody = document.querySelector("#oostable");
                    var template = document.querySelector("#outOfStockM");
                    var clone = template.content.cloneNode(true);
                    var tr = clone.querySelector("tr");
                    var td = clone.querySelectorAll("td");
                    td[0].textContent = doc.data().name;
                    td[1].textContent = doc.data().estimated;
                
                    tbody.appendChild(clone);
                }
                else if(doc.data().quantity <= 20 && doc.data().estimated == "") {
                    var tbody = document.querySelector("#lstable");
                    var template = document.querySelector("#lowStockM");
                    var clone = template.content.cloneNode(true);
                    var tr = clone.querySelector("tr");
                    var td = clone.querySelectorAll("td");
                    td[0].textContent = doc.data().name;
                    td[1].textContent = doc.data().quantity;
                
                    tbody.appendChild(clone);
                }
                else if(doc.data().quantity <= 20 && doc.data().estimated != "" ) {
                    var tbody = document.querySelector("#orderedtable");
                    var template = document.querySelector("#orderedStockM");
                    var clone = template.content.cloneNode(true);
                    var tr = clone.querySelector("tr");
                    var td = clone.querySelectorAll("td");
                    td[0].textContent = doc.data().name;
                    td[1].textContent = doc.data().quantity;
                    td[2].textContent = doc.data().estimated;
                
                    tbody.appendChild(clone);
                }
            }
        });
    });
}

