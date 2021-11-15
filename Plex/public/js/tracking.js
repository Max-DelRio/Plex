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
var uid;
var count = 1;
var edit;
var row;

window.addEventListener('DOMContentLoaded', (event) => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            uid = user.uid;
            console.log(uid);
            var docRef = db.collection("Users").doc(uid);
            docRef.get().then((doc) => {
                if(doc.exists){
                    queryDB();
                    document.querySelector("#clear").onclick = function(){
                        console.log(row);
                        $(row).css("background-color", "#fdfdfe");
                        document.getElementById("orderno").value = "";
                        document.getElementById("product").value = "";
                        edit = "";
                    };
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
                var template = document.querySelector("#orderRow");
                var clone = template.content.cloneNode(true);
                var tr = clone.querySelector("tr");
                var td = clone.querySelectorAll("td");
                td[0].textContent = count;
                td[1].textContent = doc.data().orderno;
                td[2].textContent = doc.data().product;
                td[3].textContent = doc.data().station;
                td[4].textContent = doc.data().status;
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
                $(this).css("background-color", "#eaeaeb");
                document.getElementById("orderno").value = this.cells[1].innerHTML;
                document.getElementById("product").value = this.cells[2].innerHTML;
                edit = this.cells[5].innerHTML;
            }
        }
    });
}

document.querySelector("#signoff").addEventListener("submit", function SignOff(e) {
        e.preventDefault();
        const orderno = document.getElementById("orderno").value;
        const product = document.getElementById("product").value;
        const select = document.getElementById("status");
        const status = select.value;
        const select2 = document.getElementById("instation");
        const station = select2.value;
        var docRef = db.collection("Users").doc(uid);
        docRef.get().then((doc) => {
            if(doc.exists){
                console.log(doc.data().first + doc.data().last);
                const logString = doc.data().first + " " + doc.data().last + " signed off on " + orderno + " (" + product + ") at station: " + station + ", with status: " + status +"." 
                wait();
                async function wait(){
                    let result = await Promise.resolve(db.collection("Log").add({log: logString}));
                }
            }
        });
        
        wait2();
        async function wait2(){
            let result = await Promise.resolve(db.collection("Tracking").doc(edit).update({orderno: orderno, product: product, station: station, status: status}));
            location.reload();
        }
});


document.querySelector("#filter").addEventListener("click", function table(e){
    e.preventDefault();
    var select = document.getElementById("sortCate");
    var category = select.value;
    var equals = "==";
    var query = document.getElementById("query").value;
    var ref = db.collection("Tracking");
    var result = ref.where(category,equals,query);
    count = 1;
    document.getElementById("table").innerHTML="";
    result.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            console.log(doc.id, " => ", doc.data().name, doc.data().id, doc.data().category, doc.data().quantity);
            if('content' in document.createElement('template')) {
                var tbody = document.querySelector("#table");
                var template = document.querySelector("#orderRow");
                var clone = template.content.cloneNode(true);
                var tr = clone.querySelector("tr");
                var td = clone.querySelectorAll("td");
                td[0].textContent = count;
                td[1].textContent = doc.data().orderno;
                td[2].textContent = doc.data().product;
                td[3].textContent = doc.data().station;
                td[4].textContent = doc.data().status;
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
                $(this).css("background-color", "#eaeaeb");
                document.getElementById("orderno").value = this.cells[1].innerHTML;
                document.getElementById("product").value = this.cells[2].innerHTML;
                edit = this.cells[5].innerHTML;
            }
        }
    });
});

document.querySelector("#cFilter").addEventListener("click", function table(e){
    e.preventDefault();
    document.getElementById("table").innerHTML="";
    queryDB();
});




