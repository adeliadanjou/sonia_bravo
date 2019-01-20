const messageApp = require('../messageApp/messageApp')
const messageSave = require('../clients/messageSave')
const pay = require('../clients/pay')
const locks = require('locks');
var mutex = locks.createMutex();

let validation = function (req, res) {
 
  const {
    myId,
    destination,
    body,

  } = req.body;

  if (typeof destination !== "string" || typeof body !== "string") {
  
    console.log("Please enter valid strings in both areas");

  } else if (destination === "" || body === "") {
   
    console.log("Destination or body cannot be empty");
  } else {

    addToQueue()
  }

}

module.exports = validation;