const express = require('express');
const getHealth = express.Router();


getHealth.get('/health', (req, res, next) => {
  res.status(200).json("alive")
})

module.exports = getHealth