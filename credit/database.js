require('dotenv').config();
const mongoose = require('mongoose');


const mongodbCredit = mongoose.createConnection(process.env.MongodbCredit, {
     useNewUrlParser: true
})
const replicaCredit = mongoose.createConnection(process.env.ReplicaCredit, {
     useNewUrlParser: true
});


let db = {
     mongodbCredit: {
          isPrimary: true,
          mongo: mongodbCredit
     },
     replicaCredit: {
          isPrimary: false,
          mongo: replicaCredit
     },
}


let getConnection = function (mongo) {
     if (mongo === "primary") {
          // si mongo es primary, conecta a la database1 y haz el modelo con ella
          return db.mongodbCredit.isPrimary && db.mongodbCredit.mongo.readyState === 1 ?
               db.mongodbCredit.mongo : db.replicaCredit.mongo
     } else if (mongo === "replica") {
          // si mongo es replica, conecta a la database2 y haz el modelo con ella
          return !db.replicaCredit.isPrimary && db.replicaCredit.mongo.readyState === 1 ?
               db.replicaCredit.mongo : db.mongodbMessage.mongo
     }

}

let isReplicaOn = function () {
     if (db.mongodbCredit.mongo.readyState === 1 && db.replicaCredit.mongo.readyState === 1) {
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