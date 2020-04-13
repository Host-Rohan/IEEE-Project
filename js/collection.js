
class db{
  constructor(farmer, produce, quantity, cost, type){
    this.farmer = farmer;
    this.produce = produce;
    this.quantity = quantity;
    this.cost = cost;
    this.type = type;
  }
}

function hide(){
  var err = document.getElementById('error');
  var success = document.getElementById('success');
  if (err.style.display == "block") {
    err.style.display = "none";
  }
  else if (success.style.display == "block") {
    success.style.display = "none";
  }
}

function submitData() {
  var farmer = document.getElementById('name_of_farmer').value.trim();
  var produce = document.getElementById('produce').value.trim();
  var quantity = document.getElementById('quantity').value.trim();
  var cost = document.getElementById('cost_of_cultivation').value.trim();
  var type = document.getElementById('type').value.trim();
  var user = firebase.auth().currentUser;
  console.log(user);
  console.log(farmer, produce, quantity, cost );

  var details = new db(farmer, produce, quantity, cost, type);
  console.log(details);

    if (farmer !== "" && produce !== "" && quantity !== "" && cost !== "" && type !== "") {
      console.log(farmer);
      if (user) {
        firebase.database().ref().child(user.displayName).push().set(details,
        function(error) {
          if (error) {
            document.getElementById('emsg').textContent = "Failed to push data!";
            document.getElementById('error').style.display = "block";
          }
          else {
            document.getElementById('success').style.display = "block";
          }
        });
        setTimeout(hide, 5000);
      }
      else {
        alert("An unexpected error occured!\nplease login again to continue");
        window.location = "register.html";
      }
    }
    else {
      document.getElementById('error').style.display = "block";
    }
}