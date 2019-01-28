const Message = require("../models/Message");
const logger = require('../logs/winston')

let updateMessage = function (myId, status) {

  var MessagePrimary = Message("primary");

  return MessagePrimary.findOneAndUpdate({ myId: myId}, {"status": status})
    .then(messageP => {
      logger.info("Updated message status in Primary")
      var MessageReplica = Message("replica");
      return MessageReplica.findOneAndUpdate({ myId: myId }, {"status": status})
        .then(messageP => {
          logger.info("Primary & Replica: UPDATED PENDING TO OK, TIMEOUT...")
        })
        .catch(logger.error("ERROR REPLICA: PENDING TO OK, TIMEOUT..."))
    })
    .catch(logger.error("ERROR PRIMARY: PENDING TO OK,TIMEOUT..."))

}

module.exports = updateMessage;