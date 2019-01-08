const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const indexRoute = require('./routes/index');
const postMessageRoute = require('./routes/postMessage')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRoute)
app.use('/', postMessageRoute)

app.listen(9001, () => {
  console.log('¡A la escucha en el puerto: 9001!')
});