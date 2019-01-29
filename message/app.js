  require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const postMessageRoute = require('./routes/postMessages')
const getMessagesRoute = require('./clients/getMessages')
const getMessagesStatus = require('./clients/getMessagesStatus')
const getHealth = require('./routes/getHealth')
const getMetrics = require('./routes/getMetrics')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/', postMessageRoute)
app.use('/', getMessagesRoute)
app.use('/', getMessagesStatus)
app.use('/', getHealth)
app.use('/', getMetrics)

app.listen(process.env.PORT, () => {
  console.log('¡A la escucha en el puerto: 9007!')
});


// http://sonia_bravo_messageapp_1:3000/message
//mongodb://sonia_bravo_mongo_1/cabify