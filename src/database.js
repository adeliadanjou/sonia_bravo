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
     mongoDT1: {isPrimary: true, mongo: mongoDT1},
     mongoDT2: {isPrimary: false, mongo: mongoDT2},
}


let getConnection = function(mongo){
     if(mongo === "primary"){
          // si mongo es primary, conecta a la database1 y haz el modelo con ella
          return db.mongoDT1.isPrimary && db.mongoDT1.mongo.readyState === 1 ?
           db.mongoDT1.mongo : db.mongoDT2.mongo
     } else {
          // si mongo es replica, conecta a la database2 y haz el modelo con ella
          return !db.mongoDT2.isPrimary && db.mongoDT2.mongo.readyState === 1 ? 
          db.mongoDT2.mongo : console.log("hay que borrar el primer registro")
     }
    
}

let isReplicaOn = function(){
     if(db.mongoDT1.mongo.readyState === 1 && db.mongoDT2.mongo.readyState === 1){
         //si tengo las dos bases conectadas
          return true
     } 
     else {
          //si tengo una conectada
           return false
      } 
     }

module.exports = {getConnection, db, isReplicaOn};