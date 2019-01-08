const axios = require('axios');

let messageApp = function(destination,body) {
  return axios.post('http://exercise-1_messageapp_1:3000/message', {destination, body})
}

module.exports = messageApp;