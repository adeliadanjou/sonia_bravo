const Message = require("../models/Message");

let pendingMessageSave = function (messageObj) {

  var MessagePrimary = Message("primary");
  var myMessageP = new MessagePrimary(messageObj);

  return myMessageP.save()
    .then(myMessage => {

      var MessageReplica = Message("replica");
      var myMessageR = new MessageReplica(messageObj);
    
      return myMessageR.save()
        .then(myMessage => {
          return console.log("guardado PENDING en replica")
        })
        .catch(myMessage => {
          return console.log(myMessage)
        })

    })
    .catch(myMessage => {
      return console.log(myMessage)
    })


}

module.exports = pendingMessageSave