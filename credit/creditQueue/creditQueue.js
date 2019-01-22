const Queue = require('bull');
const pay = require('../clients/pay')
const creditValidation = require('../validations/creditValidation')
//creo la cola:
const creditQueue = new Queue('creditQueue');
const messageQueue = new Queue('messageQueue');
const uuidv4 = require('uuid/v4');


creditQueue.process(function (job, done) {
   console.log(job)
   return creditValidation(job).then(done)
})

// let addCreditQueue = function (req, res, next) {
//   const myId = uuidv4()

//   const messageObj = {
//     myId: myId,
//     destination: req.body.destination,
//     body: req.body.body,
//     status: "PENDING",
//   }

//   pendingMessageSave(messageObj)

//   creditQueue.add(messageObj)
//   res.send(`processing your message ${messageObj.myId}`)
// }

// messageQueue.on('completed', function (job, result) {
//   console.log("TRABAJO DE LA COLA HECHO")
// })


module.exports = {creditQueue, messageQueue};