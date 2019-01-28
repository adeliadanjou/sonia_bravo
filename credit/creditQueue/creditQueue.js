const Queue = require('bull');
const pay = require('../clients/pay')
const checkCredit = require('../validations/checkCredit')
const creditQueue = new Queue('creditQueue', 'redis://sonia_bravo_redis_1:6379');
const messageQueue = new Queue('messageQueue', 'redis://sonia_bravo_redis_1:6379');


creditQueue.process(function (job, done) {

   checkCredit(job)
      .then(checkCredit => {
         if (checkCredit.isCredit === "YES") {
            pay().then(() => messageQueue.add(checkCredit))
               .then(done)
               .catch(done);
         }
      })

})


module.exports = {
   messageQueue,
   creditQueue
};