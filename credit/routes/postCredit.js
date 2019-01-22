const express = require('express');
const postCreditRoute = express.Router();
const creditSave = require('../clients/creditSave')


postCreditRoute.post('/credit', (req, res, next) => {
  const amount = req.body.amount;

    creditSave(amount, res)

});


module.exports = postCreditRoute;