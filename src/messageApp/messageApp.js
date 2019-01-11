require('dotenv').config();
const axios = require('axios');

let messageApp = function(destination,body) {
  return axios.post(process.env.AXIOSPORT, {destination, body}, {timeout: 3000})
}

module.exports = messageApp;