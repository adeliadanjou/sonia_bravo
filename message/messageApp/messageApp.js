require('dotenv').config();
const axios = require('axios');

let messageApp = function (destination, body) {
  return axios.post(process.env.AXIOSPORT, {destination,body}, {timeout: 20000 })
  .then(console.log("OK"))
  .catch(error => { 
    if(error.message===undefined){throw new Error("Timed out")}
    else{throw new Error("Breaker is open")}
   })
}

module.exports = messageApp;