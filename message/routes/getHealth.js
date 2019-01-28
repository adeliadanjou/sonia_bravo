const express = require('express');
const getHealth = express.Router();
const logger = require('../logs/winston')

getHealth.get('/health', (res) => {
  res.status(200).json("alive")
  logger.info("Health of Haproxy OK!")
})

module.exports = getHealth