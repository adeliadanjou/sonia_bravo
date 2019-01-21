const Credit = require("../models/UserCredit");
const validation = require('../validations/validations')

let creditValidation = function(req,res,next) {

  Credit("primary").find({})
  .then(credit => {
  if(credit[0].amount === 0){
    console.log("you have not credit")
    } else {
      validation(req,res,next)
    }
  })

  .catch(error => {
    console.log("entra en catch creditValidation")
    
  })


}

module.exports = creditValidation;