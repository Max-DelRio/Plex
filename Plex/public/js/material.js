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
                // tr.id = doc.id;
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
                td[12].textContent = id;
                var button = clone.querySelectorAll("button");
                // var txt = clone.querySelectorAll("input");
                var txt = clone.querySelector("input");
                // if(userRole == "Employee"){
                //     td[15].style.display = "none";
                // }
                // else if(userRole == "Admin"){
                //     td[15].style.display = "block";
                // }
                button[0].onclick = function() {
                    var choice = confirm("Do you want to update the quantity?");
                    if(choice){
                        wait();
                        async function wait(){
                            // const new_quan = txt[0].value
                            const new_quan = txt.value;
                            const update_ref = db.collection("Materials").doc(id);
                            const res = await Promise.resolve(update_ref.update({quantity: new_quan}));
                            location.reload();
                        }
                    }
                    else{
                        location.reload();
                    }
                }
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

                tbody.appendChild(clone);
            }
            count++;
        });
        var table = document.getElementById("materials");
        var rows = table.querySelectorAll("tr");
        for(var i = 1; i < rows.length; i++){
            rows[i].onclick = function(){
                row = this;
                $(this).css("background-color", "#eaeaeb");
                document.getElementById("ename").value = this.cells[1].innerHTML;
                document.getElementById("eID").value = this.cells[2].innerHTML;
                document.getElementById("esupplier").value = this.cells[3].innerHTML;
                document.getElementById("ethickness").value = this.cells[4].innerHTML;
                document.getElementById("esize").value = this.cells[5].innerHTML;
                document.getElementById("edescription").value = this.cells[6].innerHTML;
                document.getElementById("equantity").value = this.cells[7].innerHTML;
                document.getElementById("etotalPrice").value = this.cells[8].innerHTML;
                document.getElementById("eestimated").value = this.cells[9].innerHTML;
                document.getElementById("eshipping").value = this.cells[10].innerHTML;
                document.getElementById("elocation").value = this.cells[11].innerHTML;
                edit = this.cells[12].innerHTML;
            }
        }
    });
}

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

document.querySelector("#editMaterial").addEventListener("submit", function EditMaterial(e) {
    e.preventDefault();
    console.log("edit"+edit);
    const name = document.getElementById("ename").value;
    const ID = document.getElementById("eID").value;
    const supplier = document.getElementById("esupplier").value;
    const thickness = document.getElementById("ethickness").value;
    const size = document.getElementById("esize").value;
    const Description = document.getElementById("edescription").value;
    const Quantity = document.getElementById("equantity").value;
    const totalPrice = document.getElementById("etotalPrice").value;
    const estimated = document.getElementById("eestimated").value;
    const shipping = document.getElementById("eshipping").value;
    const Location = document.getElementById("elocation").value;
    wait();
    async function wait(){
        const result = await Promise.resolve(db.collection("Materials").doc(edit).update({name: name, id: ID, supplier: supplier, thickness: thickness, size: size, description: Description, quantity: Quantity, totalprice: totalPrice, estimated: estimated, shipping: shipping, location: Location}));
        location.reload();
    }   
});

document.querySelector("#clear").onclick = function(){
    $(row).css("background-color", "#fdfdfe");
    document.getElementById("ename").value = "";
    document.getElementById("eID").value = "";
    document.getElementById("esupplier").value = "";
    document.getElementById("ethickness").value = "";
    document.getElementById("esize").value = "";
    document.getElementById("edescription").value = "";
    document.getElementById("equantity").value = "";
    document.getElementById("etotalPrice").value = "";
    document.getElementById("eestimated").value = "";
    document.getElementById("eshipping").value = "";
    document.getElementById("elocation").value = "";
    edit = "";
};

document.querySelector("#filter").addEventListener("click", function table(e){
    e.preventDefault();
    var select = document.getElementById("sortCate");
    var category = select.value;
    var equals = "==";
    var query = document.getElementById("query").value;
    var ref = db.collection("Materials");
    var result = ref.where(category,equals,query);
    count = 1;
    document.getElementById("table").innerHTML="";
    result.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            console.log(doc.id, " => ", doc.data().name, doc.data().id, doc.data().supplier,  doc.data().thickness,  doc.data().size, doc.data().description, doc.data().quantity, doc.data().totalprice, doc.data().estimated, doc.data().shipping, doc.data().location);
            // Name	ID	Supplier	Thickness	Size	Description	Quantity	Total Price	Est. Delivery Date	Shipping Method	Location
            if('content' in document.createElement('template')) {
                var tbody = document.querySelector("#table");
                var template = document.querySelector("#materialRow");
                var clone = template.content.cloneNode(true);
                var tr = clone.querySelector("tr");
                // tr.id = doc.id;
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
                td[12].textContent = id;
                var button = clone.querySelectorAll("button");
                // var txt = clone.querySelectorAll("input");
                var txt = clone.querySelector("input");
                // if(userRole == "Employee"){
                //     td[11].style.display = "none";
                // }
                // else if(userRole == "Admin"){
                //     td[15].style.display = "block";
                // }
                button[0].onclick = function() {
                    var choice = confirm("Do you want to update the quantity?");
                    if(choice){
                        wait();
                        async function wait(){
                            // const new_quan = txt[0].value
                            const new_quan = txt.value;
                            const update_ref = db.collection("Materials").doc(id);
                            const res = await Promise.resolve(update_ref.update({quantity: new_quan}));
                            location.reload();
                        }
                    }
                    else{
                        location.reload();
                    }
                }
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

                tbody.appendChild(clone);
            }
            count++;
        });
        var table = document.getElementById("materials");
        var rows = table.querySelectorAll("tr");
        for(var i = 1; i < rows.length; i++){
            rows[i].onclick = function(){
                row = this;
                $(this).css("background-color", "#eaeaeb");
                document.getElementById("ename").value = this.cells[1].innerHTML;
                document.getElementById("eID").value = this.cells[2].innerHTML;
                document.getElementById("esupplier").value = this.cells[3].innerHTML;
                document.getElementById("ethickness").value = this.cells[4].innerHTML;
                document.getElementById("esize").value = this.cells[5].innerHTML;
                document.getElementById("edescription").value = this.cells[6].innerHTML;
                document.getElementById("equantity").value = this.cells[7].innerHTML;
                document.getElementById("etotalPrice").value = this.cells[8].innerHTML;
                document.getElementById("eestimated").value = this.cells[9].innerHTML;
                document.getElementById("eshipping").value = this.cells[10].innerHTML;
                document.getElementById("elocation").value = this.cells[11].innerHTML;
                edit = this.cells[12].innerHTML;
            }
        }
    });
});

document.querySelector("#clearFilter").addEventListener("click", function table(e){
    e.preventDefault();
    document.getElementById("table").innerHTML="";
    queryDB();
    count = 1;
});


