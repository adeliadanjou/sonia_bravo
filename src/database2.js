const mongoose = require('mongoose');

let mongoConnect2 = function () {
     const clear = setInterval(() => {
          mongoose.Promise = Promise;
          mongoose
               .createConnection(process.env.CabifyReplica, {
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

module.exports = mongoConnect2;