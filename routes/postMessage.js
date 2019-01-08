const express = require('express');
const postMessageRoute = express.Router();
const messageApp = require('../messageApp')

postMessageRoute.post('/messages',  (request, response, next) =>{
  console.log(request.body)
  const {destination, body} = request.body;

  messageApp(destination,body)
  .then(resp => {
    response.status(200);
    response.send(`${resp.data}`)
  })
  .catch(e => {console.log('Error')
    response.status(500)
    response.send('Send again')
  })
});

module.exports = postMessageRoute;