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

db.collection("Products").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const id = doc.id;
        console.log(doc.id, " => ", doc.data().name, doc.data().id, doc.data().category, doc.data().quantity);
        if('content' in document.createElement('template')) {
            var tbody = document.querySelector("#table");
            var template = document.querySelector("#productRow");
            var clone = template.content.cloneNode(true);
            var tr = clone.querySelector("tr");
            tr.id = doc.id;
            var td = clone.querySelectorAll("td");
            td[0].textContent = count;
            td[1].textContent = doc.data().name;
            td[2].textContent = doc.data().id;
            td[3].textContent = doc.data().category;
            td[4].textContent = doc.data().quantity;
            var button = clone.querySelectorAll("button");
            button[1].onclick = function() {
                var choice = confirm("Do you want to delete this product?");
                if(choice){
                    wait();
                    async function wait(){
                        let result = await Promise.resolve(db.collection("Products").doc(id).delete());
                        location.reload();
                    }
                }
                else{
                    location.reload();
                }
            }

            tbody.appendChild(clone);
        }
        count++;
    });
});

document.querySelector("#addProduct").addEventListener("submit", function AddProduct(e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const ID = document.getElementById("ID").value;
        const category = document.getElementById("category").value;
        const quantity = document.getElementById("quantity").value;
        
        wait();
        async function wait(){
            let result = await Promise.resolve(db.collection("Products").add({name: name, id: ID, category: category, quantity: quantity}));
            location.reload();
        }
});




