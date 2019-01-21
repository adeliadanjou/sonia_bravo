const Message = require("../models/Message");

let messageSave = function(myId,destination,body, status) {
  
    var MessagePrimary = Message("primary");
    var myMessageP = new MessagePrimary({myId,destination,body,status});
    
  return myMessageP.save()
  .then(myMessage => {
     console.log("guardado primary")

    var MessageReplica = Message("replica");
    var myMessageR = new MessageReplica({myId,destination,body,status});
    
  myMessageR.save()
  .then(myMessage => {
    return console.log("guardado en replica")
  })
  .catch(myMessage => {
    return console.log("error guardando en replica")
  })


  })
  .catch(myMessage => {
   
    return console.log("error guardando MESSAGESAVE")
  })
 
}

module.exports = messageSave;