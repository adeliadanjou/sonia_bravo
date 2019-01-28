const express = require('express');
const postCreditRoute = express.Router();
const creditSave = require('../clients/creditSave')


postCreditRoute.post('/credit', (req, res, next) => {
  const amount = req.body.amount;

  creditBodyValidation(amount,res) ? creditSave(amount, res): res.send("Please enter a valid amount")

});


let creditBodyValidation = function(amount,res) {
  if (typeof amount !== "number") {
    return true

  } else if (amount === "") {
    return true
  }
  else { return true}

}



module.exports = postCreditRoute;