const circuitBreaker = require('opossum');
const messageApp = require('./messageApp')


const options = {
  timeout: 1000,
  errorThresholdPercentage: 10,
  resetTimeout: 30000
};
const breaker = circuitBreaker(messageApp, options);

breaker.on('success', (result) => console.log( "*******************    SUCCESS    ********************"));
breaker.on('reject', (result) => console.log( "*******************    REJECT    ********************"));
breaker.on('timeout', (result) => console.log("*******************    TIMEOUT    *******************"));



module.exports = breaker;

