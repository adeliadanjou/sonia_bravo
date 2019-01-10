const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose     = require('mongoose');
const indexRoute = require('./routes/index');
const postMessageRoute = require('./routes/postMessage')

// setTimeout(function(){ mongoose
//   .connect('mongodb://sonia_bravo_mongo_1/cabify', {useNewUrlParser: true})
//   .then(x => {
//     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
//   })
//   .catch(err => {
//     console.error('Error connecting to mongo', err)
//   }); }, 10000);

  setTimeout(function(){
    mongoose
        .connect('mongodb://sonia_bravo_mongo_1/cabify', { useNewUrlParser: true })
        .then(x => {
            console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
        })
        .catch(err => {
            console.error('Error connecting to mongo', err)
        });
  }, 25000);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRoute)
app.use('/', postMessageRoute)

app.listen(9001, () => {
  console.log('¡A la escucha en el puerto: 9001!')
});