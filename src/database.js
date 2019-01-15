require('dotenv').config();
const mongoose = require('mongoose');


const mongoDT1 = mongoose.createConnection(process.env.CabifyDT, {
     useNewUrlParser: true  
})
const mongoDT2 = mongoose.createConnection(process.env.CabifyReplica, {
     useNewUrlParser: true    
});

// mongoDT1.on("disconnect", function(){
//      mongoDT2.isPrimary = true;
//      mongoDT1.isPrimary = false;
//      mongoDT1.isConnected = false;
// })
let db = {
     mongoDT1: {isPrimary: true, isConnected: true, mongo: mongoDT1},
     mongoDT2: {isPrimary: false, isConnected: true, mongo: mongoDT2},
}



let getConnection = function(mongo){
     if(mongo === "primary"){
          // si mongoDT1 es true, conecta a la database1 y haz el modelo con ella
          return db.mongoDT1.isPrimary && db.mongoDT1.mongo.readyState === 1 ?
           db.mongoDT1.mongo : db.mongoDT2.mongo
     } else if (mongo === "replica") {
          // si mongoDT2 es true, conecta a la database2 y haz el modelo con ella
          return db.mongoDT2.isPrimary && mongoose.connection.readyState === 1 ? 
          db.mongo.mongoDT2 : console.log("hay que borrar el primer registro")
     }
     else {
          console.log("esta mierda esta mal")
     }
}



// let mongoConnect = function (param) {
//      const clear = setInterval(() => {
//           mongoose.Promise = Promise;
//           mongoose
//                .createConnection(param, {
//                     useNewUrlParser: true
                    
//                })
//                .then(x => {
//                     console.log(`Connected to Mongo! Database name: "${x.name}"`)
//                     clearInterval(clear)
//                })
//                .catch(err => {
//                     console.error('Error connecting to mongo', err)
//                });
//      }, 4000)
// }

module.exports = {getConnection, db};