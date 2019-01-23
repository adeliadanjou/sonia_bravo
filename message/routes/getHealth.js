const express = require('express');
const getHealth = express.Router();


getHealth.get('/health', (req, res, next) => {

  res.status(200)
})

module.exports = getHealth