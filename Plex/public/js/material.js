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

db.collection("Materials").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const id = doc.id;
        console.log(doc.id, " => ", doc.data().name, doc.data().id, doc.data().supplier,  doc.data().thickness,  doc.data().size, doc.data().description, doc.data().quantity, doc.data().totalprice, doc.data().estimated, doc.data().shipping, doc.data().location);
        // Name	ID	Supplier	Thickness	Size	Description	Quantity	Total Price	Est. Delivery Date	Shipping Method	Location
        if('content' in document.createElement('template')) {
            var tbody = document.querySelector("#table");
            var template = document.querySelector("#materialRow");
            var clone = template.content.cloneNode(true);
            var tr = clone.querySelector("tr");
            tr.id = doc.id;
            var td = clone.querySelectorAll("td");
            td[0].textContent = count;
            td[1].textContent = doc.data().name;
            td[2].textContent = doc.data().id;
            td[3].textContent = doc.data().supplier;
            td[4].textContent = doc.data().thickness;
            td[5].textContent = doc.data().size;
            td[6].textContent = doc.data().description;
            td[7].textContent = doc.data().quantity;
            td[8].textContent = doc.data().totalprice;
            td[9].textContent = doc.data().estimated;
            td[10].textContent = doc.data().shipping;
            td[11].textContent = doc.data().location;
            var button = clone.querySelectorAll("button");
            button[1].onclick = function() {
                var choice = confirm("Do you want to delete this material?");
                if(choice){
                    wait();
                    async function wait(){
                        let result = await Promise.resolve(db.collection("Materials").doc(id).delete());
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
                        const new_quan = txt[0].value
                        const update_ref = db.collection("Materials").doc(id);
                        const res = await Promise.resolve(update_ref.update({quantity: new_quan}));
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

document.querySelector("#addMaterial").addEventListener("submit", function AddMaterial(e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const ID = document.getElementById("ID").value;
        const supplier = document.getElementById("supplier").value;
        const thickness = document.getElementById("thickness").value;
        const size = document.getElementById("size").value;
        const Description = document.getElementById("description").value;
        const Quantity = document.getElementById("quantity").value;
        const totalPrice = document.getElementById("totalPrice").value;
        const estimated = document.getElementById("estimated").value;
        const shipping = document.getElementById("shipping").value;
        const Location = document.getElementById("location").value;
        
        wait();
        async function wait(){
            let result = await Promise.resolve(db.collection("Materials").add({name: name, id: ID, supplier: supplier, thickness: thickness, size: size, description: Description, quantity: Quantity, totalprice: totalPrice, estimated: estimated, shipping: shipping, location: Location}));
            location.reload();
        }
});




