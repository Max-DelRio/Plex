
function myFunction() {
  var testUserEmail = document.getElementById("test_email_field").value;
  var testUserPass = document.getElementById("test_pass_field").value;

  // document.getElementById("demo").innerHTML = testUserEmail + " " + testUserPass;
  window.alert(testUserEmail + " " + testUserPass);
  // window.alert("work");

  // window.location.replace("./dashboard.html");

  // const auth = getAuth();
  // signInWithEmailAndPassword(auth, testUserEmail, testUserPass)
  // .then((userCredential) => {
  //   // Signed in 
  //   const user = userCredential.user;
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   window.alert(errorMessage);
  // });



  // firebase.auth().signInWithEmailAndPassword(testUserEmail, testUserPass)
  // .then((userCredential) => {
  //   // Signed in
  //   var user = userCredential.user;
  //   window.location.replace("./dashboard.html");
  //   // ...
  // })
  // .catch((error) => {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   window.alert(errorMessage);
  // });
  

  // firebase.auth().signInWithEmailAndPassword(testUserEmail, testUserPass).then((success) => {
  //   swal({
  //     type: 'successfull',
  //     title: 'Succesfully signed in', 
  //   }).then((value) => {
  //       setTimeout(function(){
  //           window.location.replace("./dashboard.html");
  //       }, 1000)
  //   });
  // }).catch((error) => {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;

  //   window.alert("not work");
  //   swal({
  //       type: 'error',
  //       title: 'Error',
  //       text: "Error",
  //   })
  // });










  window.alert("work");

}