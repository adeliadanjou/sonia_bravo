const Credit = require("../models/UserCredit");
const validation = require('../validations/validations')

let creditValidation = function(req,res,next) {
  
  Credit("primary").find({})
  .then(credit => {
  if(credit[0].amount === 0){
    res.status(500).send("No cash, No messages")
    } else {
      
      validation(req,res,next)
    }
  })

  .catch(error => {
    res.status(500).send("Error: No credit database")
    
  })


}

module.exports = creditValidation;