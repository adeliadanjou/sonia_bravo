require('dotenv').config();
const mongoose = require('mongoose');


const mongodbMessage = mongoose.createConnection(process.env.MongodbMessage, {
     useNewUrlParser: true
})
const replicaMessage = mongoose.createConnection(process.env.ReplicaMessage, {
     useNewUrlParser: true
});


let db = {
     mongodbMessage: {
          isPrimary: true,
          mongo: mongodbMessage
     },
     replicaMessage: {
          isPrimary: false,
          mongo: replicaMessage
     },
}


let getConnection = function (mongo) {
     if (mongo === "primary") {
          // si mongo es primary, conecta a la database1 y haz el modelo con ella
          return db.mongodbMessage.isPrimary && db.mongodbMessage.mongo.readyState === 1 ?
               db.mongodbMessage.mongo : db.replicaMessage.mongo
     } else if (mongo === "replica") {
          // si mongo es replica, conecta a la database2 y haz el modelo con ella
          return !db.replicaMessage.isPrimary && db.replicaMessage.mongo.readyState === 1 ?
               db.replicaMessage.mongo : console.log("hay que borrar el primer registro")
     }

}

let isReplicaOn = function () {
     if (db.mongodbMessage.mongo.readyState === 1 && db.replicaMessage.mongo.readyState === 1) {
          //si tengo las dos bases conectadas
          return true
     } else {
          //si tengo una conectada
          return false
     }
}

module.exports = {
     getConnection,
     db,
     isReplicaOn
};