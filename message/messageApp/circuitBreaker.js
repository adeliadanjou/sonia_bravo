const circuitBreaker = require('opossum');
const messageApp = require('./messageApp')


const options = {
  timeout: 9000,
  errorThresholdPercentage: 50,
  resetTimeout: 1000
};
const breaker = circuitBreaker(messageApp, options);

breaker.on('success', (result) => console.log( "*******************    SUCCESS    ********************"));
// breaker.on('reject', (result) => console.log( "*******************    REJECT    ********************"));
breaker.on('timeout', (result) => console.log("*******************    TIMEOUT    *******************"));



module.exports = breaker;

