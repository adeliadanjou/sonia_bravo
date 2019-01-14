const UserCredit = require("../models/UserCredit");

let creditSave = function(amount) {
  

    var myCredit = new UserCredit(
      {amount});
  
  myCredit.save()
  .then(resp => {
    console.log("Credit updated!")
  })
  .catch(resp => {
    console.log("Error updating credit")
  })
 
}

module.exports = creditSave;