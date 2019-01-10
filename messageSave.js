const Message = require("./models/Message");


let messageSave = function(destination,body) {

    var myMessage = new Message(
      {destination, body});
  
  myMessage.save()
 
}

module.exports = messageSave;