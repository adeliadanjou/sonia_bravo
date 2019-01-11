const express = require('express');
const postMessageRoute = express.Router();
const validation = require('../validations/validations')


postMessageRoute.post('/messages',  (req, res, next) =>{
  validation(req,res,next)
});

module.exports = postMessageRoute;