const Message = require("../models/Message");

let pendingMessageSave = function(messageObj) {

var MessagePrimary = Message("primary");
var myMessageP = new MessagePrimary(messageObj);

return myMessageP.save()
.then(myMessage => {
 console.log("guardado PENDING en primary")
})
.catch(myMessage => {
return console.log("error guardando PENDING en primary")
})


}

module.exports = pendingMessageSave