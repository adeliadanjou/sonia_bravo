require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const indexRoute = require('./src/routes/index');
const postMessageRoute = require('./src/routes/postMessages')
const getMessagesRoute = require('./src/clients/getMessages')
const mongoConnect = require('./mongoConnect')


mongoConnect()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRoute)
app.use('/', postMessageRoute)
app.use('/', getMessagesRoute)

app.listen(9001, () => {
  console.log('¡A la escucha en el puerto: 9001!')
});