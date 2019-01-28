const Message = require("../models/Message");
const logger = require('../logs/winston')

let updateMessage = function (myId, status) {

  var MessagePrimary = Message("primary");

  return MessagePrimary.findOneAndUpdate({ myId: myId}, {"status": status})
    .then(messageP => {
    
      var MessageReplica = Message("replica");
      return MessageReplica.findOneAndUpdate({ myId: myId }, {"status": status})
        .then(messageP => {
          logger.info("Primary & Replica: PENDING TO OK")
        })
        .catch(logger.error("ERROR REPLICA: PENDING TO OK..."))
    })
    .catch(logger.error("ERROR PRIMARY: PENDING TO OK..."))

}

module.exports = updateMessage;