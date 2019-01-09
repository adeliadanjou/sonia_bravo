const express = require('express');
const postMessageRoute = express.Router();
const messageApp = require('../messageApp')

postMessageRoute.post('/messages',  (request, response, next) =>{
  console.log(request.body)
  const {destination, body} = request.body;


   if (typeof destination !== "string" || typeof body !== "string") {
    response.status(400);
    response.send("Please enter valid strings in both areas");

  } else if (destination === "" || body === "") {
    response.status(400);
    response.send("Destination or body cannot be empty");

  } else if (destination !== "" && !destination.includes("@")){
    response.status(400);
    response.send("Destination has to be an email");
  } else if (destination.length > 30 || body.length > 30) {
    response.status(400);
    response.send("destination & body should not have more than 30 characters");
  } 

  else {

  messageApp(destination,body)
  .then(resp => {
    response.status(200);
    response.send(`${resp.data}`)
  })
  .catch(e => {console.log('Error')
    response.status(500)
    response.send('Send again')
  })
}});

module.exports = postMessageRoute;