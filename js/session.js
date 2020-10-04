var firebaseConfig = {
  apiKey: "AIzaSyCUq4iqHKzckYm3PQ1_YrvkkUYq_Nv-dms",
  authDomain: "ieee-krushival.firebaseapp.com",
  databaseURL: "https://ieee-krushival.firebaseio.com",
  projectId: "ieee-krushival",
  storageBucket: "ieee-krushival.appspot.com",
  messagingSenderId: "892909807247",
  appId: "1:892909807247:web:b7ea76eae854484fdf72fa"
};

var user;
// global variables
var displayName;
var email;
var emailVerified;
var photoURL;
var phoneNumber;
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function initApp() {
  console.log("initApp executed");
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      var district;
    // if (farmer.value.trim() !== "" && produce.value.trim() !== "" && quantity.value.trim() !== "" && cost.value.trim() !== "" && type.value.trim() !== "") {
      // console.log(farmer.value);
      firebase.database().ref("/prem").once("value").then((snapshot) => {
        district = snapshot.val().username;
        console.log(district);
      }).catch((err) => {
        console.log(err);
      });
      

      window.user = user;
      console.log("user in \n" +window.user.displayName);
      // User is signed in.
      displayName = user.displayName;
      email = user.email;
      emailVerified = user.emailVerified;
      photoURL = user.photoURL;
      var uid = user.uid;
      phoneNumber = user.phoneNumber;
      var providerData = user.providerData;
      user.getIdToken().then(function(accessToken) {
        console.log(displayName +" is logged in");
        document.getElementById('username').innerHTML = '<span class="glyphicon glyphicon-user"></span>' +" " +displayName;
        document.getElementById('sign').innerHTML = '<span class="glyphicon glyphicon-log-in"></span> Logout';
        document.getElementById('sign').setAttribute("onclick", "logout()");
        // console.log(JSON.stringify({
        //   displayName: displayName,
        //   email: email,
        //   emailVerified: emailVerified,
        //   phoneNumber: phoneNumber,
        //   photoURL: photoURL,
        //   uid: uid,
        //   accessToken: accessToken,
        //   providerData: providerData
        // }, null, '  '));
      });
    } else {
      console.log(window.location);
      url = window.location.href;
      if (url.includes("dashboard")) {
        alert("Data is Protected, please log in to continue");
        window.location = "register.html";
      }

      // User is signed out.
      document.getElementById('sign').innerHTML = '<span class="glyphicon glyphicon-log-in"></span> Sign Up';
    }
  }, function(error) {
    console.log(error);
  });
  var init = true;
}

function logout(){
  firebase.auth().signOut().then(function(){
    console.log("logged out");
    window.location = "home.html"
  }, function (err) {
    console.log("error");
  })
}
