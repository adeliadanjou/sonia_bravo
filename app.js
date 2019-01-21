require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const indexRoute = require('./src/routes/index');
const postMessageRoute = require('./src/routes/postMessages')
const postCreditRoute = require('./src/routes/postCredit')
const getMessagesRoute = require('./src/clients/getMessages')
const getMessagesStatus = require('./src/clients/getMessagesStatus')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRoute)
app.use('/', postMessageRoute)
app.use('/', postCreditRoute)
app.use('/', getMessagesRoute)
app.use('/', getMessagesStatus)

app.listen(process.env.PORT, () => {
  console.log('¡A la escucha en el puerto: 9001!')
});


// http://sonia_bravo_messageapp_1:3000/message
//mongodb://sonia_bravo_mongo_1/cabify