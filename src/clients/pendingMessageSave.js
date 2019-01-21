const Message = require("../models/Message");

let pendingMessageSave = function (messageObj) {

  var MessagePrimary = Message("primary");
  var myMessageP = new MessagePrimary(messageObj);

  myMessageP.save()
    .then(myMessage => {
      console.log("guardado PENDING en primary")
    })
    .catch(myMessage => {
      console.log("error guardando PENDING en primary")
    })

  var MessageReplica = Message("replica");
  var myMessageR = new MessageReplica(messageObj);

  return myMessageR.save()
    .then(myMessage => {
      console.log("guardado PENDING en replica")
    })
    .catch(myMessage => {
      return console.log("error guardando PENDING en replica")
    })

}

module.exports = pendingMessageSave