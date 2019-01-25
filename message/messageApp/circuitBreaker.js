const circuitBreaker = require('opossum');
const messageApp = require('./messageApp')


const options = {
  timeout: 2000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000
};
const breaker = circuitBreaker(messageApp, options);

breaker.on('success', (result) => console.log( "*******************    SUCCESS    ********************"));

breaker.on('timeout', (result) => console.log("*******************    TIMEOUT    *******************"));



module.exports = breaker;

