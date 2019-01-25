const express = require('express');
const postMessageRoute = express.Router();
const validation = require('../validations/validations')
// const creditValidation = require('../../credit/validations/creditValidation')

postMessageRoute.post('/messages', (req, res, next) => {
    
    validation(req,res)
    // message = prepareMessage(req.body)
    // enqueueToCretit(message)
    // res(oK)
});



module.exports = postMessageRoute;