const Queue = require('bull');
const breaker = require('../messageApp/circuitBreaker')
const updateMessage = require('../clients/updateMessage')
const messageQueue = new Queue('messageQueue', 'redis://sonia_bravo_redis_1:6379');
const creditQueue = new Queue('creditQueue', 'redis://sonia_bravo_redis_1:6379');

messageQueue.process(function (job, done) {

  if (job.data.type === "check credit" && job.data.isCredit === "NO") {
    console.log("Not enough credit")
    done()
  } else if (job.data.type === "check credit" && job.data.isCredit === "YES") {

    const myId = job.data.message.myId;
    const destination = job.data.message.destination;
    const body = job.data.message.body;

    return breaker.fire(destination, body)
      .then(resp => {
        let status = "OK"

        return updateMessage(myId, status)
          .then(done)
          .catch(done);

      })
      .catch(error => {
      
        if (error === "Timed out") {
          let status = error
          return updateMessage(myId, status).then(done)
            .catch(done);
        } else if (error === "Breaker is open") {
          let status = error
          return updateMessage(myId, status).then(done)
            .catch(done);
        } else {
          let status = error
          return updateMessage(myId, status).then(done)
            .catch(done);
        }
      })

  } else {
    console.log("ERROR").then(done)
  }

})

module.exports = {
  messageQueue,
  creditQueue
}