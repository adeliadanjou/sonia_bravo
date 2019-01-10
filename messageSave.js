const Message = require("./models/Message");


let messageSave = function(destination,body, status) {

    var myMessage = new Message(
      {destination, body, status});
  
  myMessage.save()
  .then(resp => {
    console.log("Guardado en base de datos")
  })
  .catch(resp => {
    console.log("NO guardado en base de datos!!")
  })
 
}

module.exports = messageSave;