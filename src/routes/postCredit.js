const express = require('express');
const postCreditRoute = express.Router();
const creditSave = require('../clients/creditSave')
const locks = require('locks');
var mutex = locks.createMutex();


postCreditRoute.post('/credit', (req, res, next) => {
  const amount = req.body.amount;
  mutex.lock(function () {
    //cuando hacemos recarga, bloqueamos con lock para que se haga en orden
    creditSave(amount, res)
    mutex.unlock();
  });

});


module.exports = postCreditRoute;