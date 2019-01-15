const mongoose = require('mongoose');

let mongoConnect = function () {
     const clear = setInterval(() => {
          mongoose.Promise = Promise;
          mongoose
               .createConnection(process.env.CabifyDT, {
                    useNewUrlParser: true
                    
               })
               .then(x => {
                    console.log(`Connected to Mongo! Database name: "${x.name}"`)
                    clearInterval(clear)
               })
               .catch(err => {
                    console.error('Error connecting to mongo', err)
               });
     }, 4000)
}

module.exports = mongoConnect;