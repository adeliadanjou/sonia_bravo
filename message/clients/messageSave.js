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
          console.log("PENDING ---> OK, TIMEOUT, ERROR")
        })
        .catch(console.log(" ERRORRRRRR REPLICA: PENDING ---> OK, TIMEOUT, ERROR"))

    })
    .catch(console.log("ERRORRRRRR PRIMARY: PENDING ---> OK, TIMEOUT, ERROR"))




}

module.exports = messageSave;