const UserCredit = require("../models/UserCredit");
const validation = require('../validations/validations')

let creditValidation = function(req,res,next) {
  
  UserCredit.find({})
  .then(credit => {
  if(credit[0].amount === 0){
    res.status(500).send("No cash, No messages :/")
    } else {
      validation(req,res,next)
    }
  })

  .catch(credit => {
    res.status(500).send("Error: No credit database")
    console.log(credit[0].amount)
  })

}


module.exports = creditValidation;