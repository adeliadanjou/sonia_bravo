const mongoose       = require('mongoose');

    let mongoConnect = function() {

      setTimeout(function(){
        mongoose
            .connect(process.env.CabifyDT, { useNewUrlParser: true })
                  .then(x => {
                  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
                       })
                  .catch(err => {
                  console.error('Error connecting to mongo', err)
                       });
         }, 22000);              
                           }
           

module.exports = mongoConnect;