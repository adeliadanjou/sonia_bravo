const Queue = require('bull');
// const pendingMessageSave = require('../clients/pendingMessageSave')
const messageApp = require('../messageApp/messageApp')
const messageSave = require('../clients/messageSave')
// const pay = require('../clients/pay')

//creo la cola:
const messageQueue = new Queue('messageQueue');
const creditQueue = new Queue('creditQueue');
const uuidv4 = require('uuid/v4');


messageQueue.process(function (job, done) {


  if(job.data.type === "check credit" && job.data.isCredit === "NO"){
   console.log("Not enough credit")
   done()
  }
  else if(job.data.type === "check credit" && job.data.isCredit === "YES"){


  const myId = job.data.message.myId;
  const destination = job.data.message.destination;
  const body = job.data.message.body;

  return messageApp(myId, destination, body)
    .then(resp => {

      let status = "OK"
    
      return messageSave(myId, status)
        .then(function () {
          // console.log("paga!")
        console.log("hecho")
        })
        .catch(() => console.log("Ok mal hecho! Entra en el catch"))

    })
    .catch(resp => {

      if (resp.status === undefined) {
        let status = "TIMEOUT"
        return messageSave(myId, status).then(done)
          .catch(done);


      } else {
        let status = "NO ENVIADO"
        return messageSave(myId, status).then(done)
          .catch(done);

      }
    })
    
  }
  else{ console.log("ERROR")}
  console.log("An error ocurred finding credit")
  done()

})

// let addToQueue = function (req, res, next) {
//   const myId = uuidv4()



//   pendingMessageSave(messageObj)

//   messageQueue.add(messageObj)
//   res.send(`processing your message ${messageObj.myId}`)
// }

// messageQueue.on('completed', function (job, result) {
//   console.log("TRABAJO DE LA COLA HECHO")
// })


module.exports = {messageQueue, creditQueue}