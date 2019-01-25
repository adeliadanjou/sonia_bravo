const Queue = require('bull');
const pay = require('../clients/pay')
const creditValidation = require('../validations/creditValidation')
//creo la cola:
const creditQueue = new Queue('creditQueue', 'redis://sonia_bravo_redis_1:6379');
const messageQueue = new Queue('messageQueue', 'redis://sonia_bravo_redis_1:6379');


creditQueue.process(function (job, done) {

   creditValidation(job)
         .then(checkCredit => {
            if(checkCredit.isCredit === "YES"){ 
                 pay().then(()=> messageQueue.add(checkCredit))

                 .then(done)
                 .catch(done);}
            })

})


module.exports = {
   messageQueue,
   creditQueue
};


