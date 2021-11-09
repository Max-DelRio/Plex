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
const newUser = firebase.initializeApp(firebaseConfig, "newUser");

db.collection("Users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        if('content' in document.createElement('template')) {
            var tbody = document.querySelector("#table");
            var template = document.querySelector("#userRow");

            var clone = template.content.cloneNode(true);
            var tr = clone.querySelector("tr");
            tr.id = doc.id;
            var td = clone.querySelectorAll("td");
            td[0].textContent = doc.data().first;
            td[1].textContent = doc.data().last;
            td[2].textContent = doc.data().email;
            td[3].textContent = doc.data().role;

            tbody.appendChild(clone);
        }
    });
});

document.querySelector("#addUser").addEventListener("submit", function AddUser(e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        newUser.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user.uid;
            // Signed in 
            console.log("worked");
            newUser.auth().signOut();
            const first = document.getElementById("first").value;
            const last = document.getElementById("last").value;
            const select = document.getElementById("role");
            const role = select.value;
            wait();
            async function wait(){
                let result = await Promise.resolve(db.collection("Users").doc(user).set({first: first,last: last,email: email,role: role}));
                location.reload();
            }
        }).then(() => {
            alert("User Added");
        });
});



