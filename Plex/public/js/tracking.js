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
    db.collection("Tracking").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            console.log(doc.id, " => ", doc.data().orderno, doc.data().product, doc.data().status);
            if('content' in document.createElement('template')) {
                var tbody = document.querySelector("#table");
                var template = document.querySelector("#productRow");
                var clone = template.content.cloneNode(true);
                var tr = clone.querySelector("tr");
                var td = clone.querySelectorAll("td");
                td[0].textContent = count;
                td[1].textContent = doc.data().orderno;
                td[2].textContent = doc.data().product;
                td[3].textContent = doc.data().status;
                td[4].textContent = doc.data().instation;
                td[5].textContent = id;
    
                tbody.appendChild(clone);
            }
            count++;
        });
        var table = document.getElementById("trackingt");
        var rows = table.querySelectorAll("tr");
        for(var i = 1; i < rows.length; i++){
            rows[i].onclick = function(){
                row = this;
                console.log(row);
                $(this).css("background-color", "#eaeaeb");
                document.getElementById("orderno").value = this.cells[1].innerHTML;
                document.getElementById("product").value = this.cells[2].innerHTML;
                edit = this.cells[5].innerHTML;
            }
        }
    });
}

document.querySelector("#addOrder").addEventListener("submit", function AddOrder(e) {
        e.preventDefault();
        const orderno = document.getElementById("orderno").value;
        const product = document.getElementById("product").value;
        const status = document.getElementById("status").value;
        const instation = document.getElementById("instation").value;
        
        wait();
        async function wait(){
            let result = await Promise.resolve(db.collection("Tracking").add({orderno: orderno, product: product, status: status, instation: instation}));
            location.reload();
        }
});

// document.querySelector("#editProduct").addEventListener("submit", function EditProduct(e) {
//     e.preventDefault();
//     console.log("edit"+edit);
//     const name = document.getElementById("ename").value;
//     const ID = document.getElementById("eID").value;
//     const category = document.getElementById("ecategory").value;
//     const quantity = document.getElementById("equantity").value;
//     wait();
//     async function wait(){    
//         const res = await Promise.resolve(db.collection("Products").doc(edit).update({name: name, id: ID, category: category, quantity: quantity}));
//         location.reload();
//     }       
    
// });

// document.querySelector("#clear").onclick = function(){
//     $(row).css("background-color", "#fdfdfe");
//     console.log(row);
//     edit = "";
// };

// document.querySelector("#filter").addEventListener("click", function table(e){
//     e.preventDefault();
//     var select = document.getElementById("sortCate");
//     var category = select.value;
//     var equals = "==";
//     var query = document.getElementById("query").value;
//     var ref = db.collection("Products");
//     var result = ref.where(category,equals,query);
//     count = 1;
//     document.getElementById("table").innerHTML="";
//     result.get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             const id = doc.id;
//             console.log(doc.id, " => ", doc.data().name, doc.data().id, doc.data().category, doc.data().quantity);
//             if('content' in document.createElement('template')) {
//                 var tbody = document.querySelector("#table");
//                 var template = document.querySelector("#productRow");
//                 var clone = template.content.cloneNode(true);
//                 var tr = clone.querySelector("tr");
//                 var td = clone.querySelectorAll("td");
//                 td[0].textContent = count;
//                 td[1].textContent = doc.data().name;
//                 td[2].textContent = doc.data().id;
//                 td[3].textContent = id;
    
//                 tbody.appendChild(clone);
//             }
//             count++;
//         });
//         var table = document.getElementById("products");
//         var rows = table.querySelectorAll("tr");
//         for(var i = 1; i < rows.length; i++){
//             rows[i].onclick = function(){
//                 row = this;
//                 $(this).css("background-color", "#eaeaeb");
//                 document.getElementById("ename").value = this.cells[1].innerHTML;
//                 document.getElementById("eID").value = this.cells[2].innerHTML;
//                 edit = this.cells[3].innerHTML;
//             }
//         }
//     });
// });

// document.querySelector("#clearFilter").addEventListener("click", function table(e){
//     e.preventDefault();
//     document.getElementById("table").innerHTML="";
//     queryDB();
// });




