const UserCredit = require("../models/UserCredit");

let pay = function(amount,res,req) {
  
  UserCredit.find({})
  .then(credit => {
   
      UserCredit.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount - 100 })
      .then(credit => {

        res.status(200).send("Payed!")
      })
      .catch(credit => {
        res.status(500).send("Error paying!")
      })

  })
  .catch(error => {
    res.send("Didn't find any credit account!")
  })

}


module.exports = pay;