const uuidv4 = require('uuid/v4');
const pendingMessageSave = require('../clients/pendingMessageSave')
const manyLogs = require('./ManyPetitions')
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

    let recovery = true;

    creditQueue.count()
    .then(queuecount =>  {
      console.log(queuecount)
      if(queuecount > 6){recovery === false}

    if(queuecount >10 && recovery === false || queuecount <10 && recovery === false)
    {console.log("cola desactivada"),res.send('Many connections, please try later!')}
    else {
    pendingMessageSave(messageObj).then(() => {
      creditQueue.add(messageObj)
      res.send(`processing your message ${messageObj.myId}`)
    })
    }
    })

  }

}

module.exports = validation;