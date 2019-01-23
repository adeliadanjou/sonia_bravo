const uuidv4 = require('uuid/v4');
const pendingMessageSave = require('../clients/pendingMessageSave')
const {
  creditQueue
} = require('../messageQueue/messageQueue');

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
      type: "Check Credit",
      myId: myId,
      destination: req.body.destination,
      body: req.body.body,
      status: "PENDING",
    }

    pendingMessageSave(messageObj).then(()=>{
      creditQueue.add(messageObj)
      res.send(`processing your message ${messageObj.myId}`)
    })

  }

}

module.exports = validation;