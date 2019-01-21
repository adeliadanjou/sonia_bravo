const Queue = require('bull');
const pendingMessageSave = require('../clients/pendingMessageSave')
const messageApp = require('../messageApp/messageApp')
const messageSave = require('../clients/messageSave')
const pay = require('../clients/pay')

//creo la cola:
const messageQueue = new Queue('messageQueue');
const uuidv1 = require('uuid/v1');


let addToQueue = function(req,res,next) { 

const messageObj = {
  myId: uuidv1(),
  destination: req.body.destination,
  body: req.body.body,
  status: "PENDING",
}

messageQueue.add(messageObj)
.then(
  pendingMessageSave(messageObj)
)
.catch(
  console.log("algo ha ido mal en addQueue")
)


messageQueue.process(function(job,done){

 const myId = job.data.myId;
 const destination = job.data.destination;
 const body = job.data.body;

  messageApp(myId, destination, body)
  .then(resp => {

    let status = "OK"
    messageSave(myId, destination, body, status)
    .then(pay()) 
    .catch(console.log("aloha"))

  })
  .catch(resp => {

    if (resp.status === undefined) {
      let status = "TIMEOUT"
      messageSave(myId, destination, body, status)
   
      console.log('Oh oh! Timeout!!!!')
    } else {
      let status = "NO ENVIADO"
      messageSave(myId, destination, body, status)

      console.log('Algo ocurrió patrón! Send Again')
    }

  })
  .then(done())
  .catch(done());

})

  .then(res.send(`processing your message ${messageObj.myId}`))
.catch(res.send(`Your message with ${messageObj.myId} was not sent`));



} 

module.exports = addToQueue;
