const Message = require("../models/Message");

let messageSave = function(myId, status) {

  var MessagePrimary = Message("primary");

  MessagePrimary.findOneAndUpdate({myId: myId}, { "status" : status }) 
      .then(messageP => {
      console.log("PENDING ---> OK, TIMEOUT, ERROR")
      })
      .catch(console.log("ERRORRRRRR PRIMARY: PENDING ---> OK, TIMEOUT, ERROR"))

      
  var MessageReplica = Message("replica");
    
  MessageReplica.findOneAndUpdate({myId: myId}, { "status" : status }) 
  .then(messageP => {
  console.log("PENDING ---> OK, TIMEOUT, ERROR")
  })
  .catch(console.log(" ERRORRRRRR REPLICA: PENDING ---> OK, TIMEOUT, ERROR"))
 
}

module.exports = messageSave;