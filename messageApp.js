const axios = require('axios');

let messageApp = function(destination,body) {
  return axios.post('http://sonia_bravo_messageapp_1:3000/message', {destination, body}, {timeout: 3000})
}

module.exports = messageApp;