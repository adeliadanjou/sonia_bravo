require('dotenv').config();
const axios = require('axios');
const logger = require('../logs/winston')

let messageApp = function (destination, body) {
  return axios.post(process.env.AXIOSPORT, {destination,body}, {timeout: 10000 })
  .then(logger.info("MessageApp: working fine"))
  .catch(error => { 
    if(error.message===undefined){
      logger.error("MessageApp: Timeout")
      throw new Error("Timed out")}
    else{
      logger.error("MessageApp: Breaker is Open")
      throw new Error("Breaker is open")}
   })
}

module.exports = messageApp;