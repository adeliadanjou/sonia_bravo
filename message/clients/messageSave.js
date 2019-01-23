const Message = require("../models/Message");

let messageSave = function (myId, status) {

  var MessagePrimary = Message("primary");

  return MessagePrimary.findOneAndUpdate({
      myId: myId
    }, {
      "status": status
    })
    .then(messageP => {
      
      var MessageReplica = Message("replica");

      return MessageReplica.findOneAndUpdate({
          myId: myId
        }, {
          "status": status
        })
        .then(messageP => {
          console.log("Primary & Replica: PENDING TO OK")
        })
        .catch(console.log("ERROR REPLICA: PENDING TO OK..."))

    })
    .catch(console.log("ERROR PRIMARY: PENDING TO OK..."))



}

module.exports = messageSave;