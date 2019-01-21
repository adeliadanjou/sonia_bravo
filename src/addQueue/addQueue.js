const Queue = require('bull');
const pendingMessageSave = require('../clients/pendingMessageSave')
const messageApp = require('../messageApp/messageApp')
const messageSave = require('../clients/messageSave')
const pay = require('../clients/pay')

//creo la cola:
const messageQueue = new Queue('messageQueue');
const uuidv4 = require('uuid/v4');

messageQueue.process(function(job,done){

  const myId = job.data.myId;
  const destination = job.data.destination;
  const body = job.data.body;
 
   messageApp(myId, destination, body)
   .then(resp => {
 
     let status = "OK"
     messageSave(myId, status)
     .then(pay()) 
     .catch(console.log("aloha"))
 
   })
   .catch(resp => {
 
     if (resp.status === undefined) {
       let status = "TIMEOUT"
       messageSave(myId, status)
    
       console.log('Oh oh! Timeout!!!!')
     } else {
       let status = "NO ENVIADO"
       messageSave(myId, status)
 
       console.log('Algo ocurrió patrón! Send Again')
     }
 
   })
   .then(done())
   .catch(done());
 
 })

let addToQueue = function(req,res,next) { 
const myId = uuidv4()

const messageObj = {
  myId: myId,
  destination: req.body.destination,
  body: req.body.body,
  status: "PENDING",
}

pendingMessageSave(messageObj)

messageQueue.add(messageObj)
 res.send(`processing your message ${messageObj.myId}`)

} 

messageQueue.on('completed', function(job, result){
  console.log("TRABAJO DE LA COLA HECHO")
})


module.exports = addToQueue;
