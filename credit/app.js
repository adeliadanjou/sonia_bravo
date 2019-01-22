require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const postCreditRoute = require('./routes/postCredit')
const {creditQueue, messageQueue} = require('./creditQueue/creditQueue')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', postCreditRoute)


app.listen(process.env.PORT, () => {
  console.log('¡A la escucha en el puerto: 9017!')
});


// http://sonia_bravo_messageapp_1:3000/message
//mongodb://sonia_bravo_mongo_1/cabify