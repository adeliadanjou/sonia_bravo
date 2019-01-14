const express = require('express');
const postCreditRoute = express.Router();
const creditSave = require('../clients/creditSave')
const locks = require('locks');
var mutex = locks.createMutex();


postCreditRoute.post('/credit',  (req, res, next) =>{
  const amount = req.body.amount;

//cuando hacemos recarga, bloqueamos con lock para que se haga en orden

mutex.lock(function () {
  creditSave(amount,res)
mutex.unlock();
});

});


module.exports = postCreditRoute;