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
var upButton = document.getElementById("updateButton");
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
            var txt = clone.querySelectorAll("input");
            button[0].onclick = function() {
                var choice = confirm("Do you want to update the quantity?");
                if(choice){
                    wait();
                    async function wait(){
                        const newQuantity = txt[0].value;
                        const res = await Promise.resolve(db.collection("Products").doc(id).update({quantity: newQuantity}));
                        location.reload();
                    }
                }
                else{
                    location.reload();
                }
            }
            
            button[2].onclick = function() {
                var choice = confirm("Do you want to update?");
                if(choice){
                  
                    wait();
                    async function wait(){
                        const updated_Name = txt[1].value;
                        const updated_ID = txt[2].value;
                        const updated_Cateogry = txt[3].value;
                        const updated_QUantity = txt[4].value;
                        const res = await Promise.resolve(db.collection("Products").doc(id).update({name: updated_Name, id: updated_ID, category: updated_Cateogry, quantity: updated_QUantity}));
                        location.reload();
                    }
                }
                else{
                    location.reload();
                }
            }

                button[3].onclick = function() {
                var choice = confirm("Do you want to update product?");
                if(choice){
                  
                    wait();
                    async function wait(){
                        const updated_Name2 = txt[1].value;
                        const updated_ID2 = txt[2].value;
                        const updated_Cateogry2 = txt[3].value;
                        const updated_QUantity2 = txt[4].value;
                        const res = await Promise.resolve(db.collection("Products").doc(id).update({name: updated_Name2, id: updated_ID2, category: updated_Cateogry2, quantity: updated_QUantity2}));
                        
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

document.querySelector("#editProduct").addEventListener("submit", function EditProduct(e) {
    e.preventDefault();
    
        const id = doc.id;
        console.log(doc.id, " => ", doc.data().name, doc.data().id, doc.data().category, doc.data().quantity);
        
        wait();
        async function wait(){    
                    
            const updated_Name2 = txt[0].value;
            const updated_ID2 = txt[1].value;
            const updated_Cateogry2 = txt[2].value;
            const updated_QUantity2 = txt[3].value;
            const res = await Promise.resolve(db.collection("Products").doc(id).update({name: updated_Name2, id: updated_ID2, category: updated_Cateogry2, quantity: updated_QUantity2}));
            
            location.reload();
        }       
    
});





