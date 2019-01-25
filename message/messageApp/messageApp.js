require('dotenv').config();
const axios = require('axios');

let messageApp = function (destination, body) {
  return axios.post(process.env.AXIOSPORT, {
    destination,
    body
  }, {
    timeout: 9000
  })
  .then(resp => {
    throw ("OK")
  })
  .catch(error => { 
    console.log("\n\nTODO ERROR 2\n")
        console.log(error)
        console.log("\n\n\n")
    if(error.response===undefined){throw new Error("Timed out")}
    else{throw new Error("Breaker is open")}
})
}

module.exports = messageApp;