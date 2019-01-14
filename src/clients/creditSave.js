const UserCredit = require("../models/UserCredit");

let creditSave = function(amount,res) {
  
  UserCredit.find({})
  .then(credit => {
    if(credit.length === 0){

      var myCredit = new UserCredit(
        {amount});
    
    myCredit.save()
    .then(credit => {
      res.status(200).send("Credit updated!")
    })
    .catch(credit => {
      res.status(500).send("Error updating credit")
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
    console.log(error)
  })

}

 
 


module.exports = creditSave;