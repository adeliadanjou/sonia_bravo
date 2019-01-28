const express = require('express');
const getHealth = express.Router();
// const logger = require('../logs/winston')

getHealth.get('/health', (req,res,next) => {
  // logger.info("Health of Haproxy OK!")
  res.status(200).json("alive")
})

module.exports = getHealth