
const addToQueue = require('../addQueue/addQueue')


let validation = function (req, res) {

  const {
    destination,
    body,

  } = req.body;

  if (typeof destination !== "string" || typeof body !== "string") {

    console.log("Please enter valid strings in both areas");

  } else if (destination === "" || body === "") {

    console.log("Destination or body cannot be empty");
  } else {
    addToQueue(req, res)
  }

}

module.exports = validation;