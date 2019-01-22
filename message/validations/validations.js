const {creditQueue} = require('../messageQueue/messageQueue');
const uuidv4 = require('uuid/v4');

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
    // creo myId única:
    const myId = uuidv4()
    // creo el objeto a añadir a add:   
    const messageObj = {
        type: "Check Credit" ,
        myId: myId,
        destination: req.body.destination,
        body: req.body.body,
        status: "PENDING",
    }
    console.log("my id única")
    // se lo añado a la cola de crédito:
    creditQueue.add(messageObj)   
  }

}

module.exports = validation;