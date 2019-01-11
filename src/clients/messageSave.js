const Message = require("../models/Message");

let messageSave = function(destination,body, status) {

    var myMessage = new Message(
      {destination, body, status});
  
  myMessage.save()
  .then(resp => {
    console.log("Message saved succesfully:")
  })
  .catch(resp => {
    console.log("Error while saving")
  })
 
}

module.exports = messageSave;