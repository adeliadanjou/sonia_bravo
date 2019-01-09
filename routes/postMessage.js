const express = require('express');
const postMessageRoute = express.Router();
const messageApp = require('../messageApp')

postMessageRoute.post('/messages',  (request, response, next) =>{
  console.log(request.body)
  const {destination, body} = request.body;

  messageApp(destination,body)
  if (destination === "" || body === "") {
    response.status(400);
    response.send("destination and body cannot be empty");
  } else if (!destination == String || !body == String) {
    response.status(400);
    response.send("This is not a string, do you know what a string is?");
  } else if (destination == undefined || body == undefined) {
    response.status(400);
    response.send("Undefined is not possible option")
  }
});

module.exports = postMessageRoute;
