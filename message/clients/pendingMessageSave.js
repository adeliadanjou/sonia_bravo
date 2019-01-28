const Message = require("../models/Message");
const logger = require('../logs/winston')

let pendingMessageSave = function (messageObj) {

  var MessagePrimary = Message("primary");
  var myMessageP = new MessagePrimary(messageObj);

  return myMessageP.save()
    .then(myMessage => {
      logger.info("Saved PENDING in primary")
      var MessageReplica = Message("replica");
      var myMessageR = new MessageReplica(messageObj);
    
      return myMessageR.save()
        .then(myMessage => {
          return logger.info("Saved PENDING in replica")
        })
        .catch(err => {
          return logger.error(err)
        })

    })
    .catch(err => {
      return logger.error(err)
    })


}

module.exports = pendingMessageSave