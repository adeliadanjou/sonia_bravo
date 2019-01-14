const UserCredit = require("../models/UserCredit");

let creditSave = function(amount,res) {
  
    var myCredit = new UserCredit(
      {amount});
  
  myCredit.save()
  .then(resp => {
    res.status(200).send("Credit updated!")
  })
  .catch(resp => {
    res.status(500).send("Error updating credit")
  })
 
}

module.exports = creditSave;