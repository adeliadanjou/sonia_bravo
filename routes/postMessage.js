const express = require('express');
const postMessageRoute = express.Router();
const messageApp = require('../messageApp')
const messageSave = require('../messageSave')

postMessageRoute.post('/messages',  (req, res, next) =>{
  console.log(req.body)
  const {destination, body} = req.body;

   if (typeof destination !== "string" || typeof body !== "string") {
    res.status(400);
    res.send("Please enter valid strings in both areas");

  } else if (destination === "" || body === "") {
    res.status(400);
    res.send("Destination or body cannot be empty");

  } else if (destination !== "" && !destination.includes("@")){
    res.status(400);
    res.send("Destination has to be an email");
  } else if (destination.length > 30 || body.length > 30) {
    res.status(400);
    res.send("destination & body should not have more than 30 characters");
  } 

  else {
  messageSave(destination,body).then(console.log("GUARDADO"))
  .catch(console.log("NO GUARDADO EN LA BASE DE DATOS"))

  messageApp(destination,body)
  .then(resp => {
    res.status(200);
    res.send(`${resp.data}`)
  })
  .catch(e => {console.log('Error')
    res.status(500)
    res.send('Send again')
  })
}});

module.exports = postMessageRoute;