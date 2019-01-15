const UserCredit = require("../models/UserCredit");

let creditSave = function(amount,res) {
   
  if (typeof amount !== "number") {
    res.status(400);
    res.send("Just numbers allowed");

  } else if (amount === "") {
    res.status(400);
    res.send("amount cannot be empty");
  }
  else {

    return UserCredit.find({})
  .then(credit => {
    if(credit.length === 0){

      var myCredit = new UserCredit(
        {amount});
    
    myCredit.save()
    .then(credit => {
      res.status(200).send("Your first credit added!!")
    })
    .catch(credit => {
      res.status(500).send("Error adding credit. No cash no party")
    })

    } else {
    
      UserCredit.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
      .then(credit => {

        res.status(200).send("Credit updated!")
      })
      .catch(credit => {
        res.status(500).send("Error updating credit")
      })


    }
  })
  .catch(error => {
    console.log("error bb")
  })
  }
  

}


module.exports = creditSave;