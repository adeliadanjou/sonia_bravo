const express = require('express');
const postCreditRoute = express.Router();
const creditSave = require('../clients/creditSave')
const logger = require('../logs/winston')

postCreditRoute.post('/credit', (req, res, next) => {
  const amount = req.body.amount;

  creditBodyValidation(amount,res) ? creditSave(amount, res): res.send("Please enter a valid amount")

});


let creditBodyValidation = function(amount,res) {
  if (typeof amount !== "number") {
    logger.warn("amount must be a number")
    return true

  } else if (amount === "") {
    logger.warn("amount cannot be empty")
    return true
  }
  else { 
    logger.warn("amount body validated")
    return true}

}



module.exports = postCreditRoute;