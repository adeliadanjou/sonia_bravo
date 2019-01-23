const Queue = require('bull');
const pay = require('../clients/pay')
const creditValidation = require('../validations/creditValidation')
//creo la cola:
const creditQueue = new Queue('creditQueue');
const messageQueue = new Queue('messageQueue');


creditQueue.process(function (job, done) {

 
   creditValidation(job)
         .then(checkCredit => {
            if(checkCredit.isCredit === "YES"){ 
                 pay().then(()=> messageQueue.add(checkCredit))

               .then(done)}
            })

})



module.exports = {
   messageQueue,
   creditQueue
};