const express = require('express');
const postCreditRoute = express.Router();
const creditSave = require('../clients/creditSave')


postCreditRoute.post('/credit',  (req, res, next) =>{
  const amount = req.body.amount;

//cuando hacemos recarga, bloqueamos con lock para que se haga en orden
lock()
  creditSave(amount,res)
unlock()
});


module.exports = postCreditRoute;