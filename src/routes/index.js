const express = require('express');
const indexRoute = express.Router();

indexRoute.get('/', (response) => {
  response.send('Hola, mundo');
});

module.exports = indexRoute;