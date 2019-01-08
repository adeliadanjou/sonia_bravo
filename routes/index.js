const express = require('express');
const indexRoute = express.Router();

indexRoute.get('/', (request, response, next) => {
  response.send('Hola, mundo');
});

module.exports = indexRoute;