const express = require('express');
const postMessageRoute = express.Router();
const creditValidation = require('../validations/creditValidation')

postMessageRoute.post('/messages', (req, res, next) => {
    creditValidation(req, res, next)
});


module.exports = postMessageRoute;