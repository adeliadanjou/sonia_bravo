const circuitBreaker = require('opossum');
const messageApp = require('./messageApp')
const logger = require('../logs/winston')


const options = {
  timeout: 9000,
  errorThresholdPercentage: 50,
  resetTimeout: 1000
};
const breaker = circuitBreaker(messageApp, options);

breaker.on('success', (result) => logger.info( "*******************    SUCCESS    ********************"));
breaker.on('reject', (result) => logger.info( "*******************    REJECT    ********************"));
breaker.on('timeout', (result) => logger.info("*******************    TIMEOUT    *******************"));



module.exports = breaker;

